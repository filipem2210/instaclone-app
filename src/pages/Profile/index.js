import React, {useState, useRef} from 'react';
import {ActivityIndicator} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ImagePicker from 'react-native-image-picker';
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import api from '../../services/api';

import {useAuth} from '../../contexts/auth';

import {
  Container,
  ImagePreview,
  ImagePreviewButton,
  ImagePreviewButtonText,
  Input,
  EditProfileButton,
  EditProfileButtonText,
  LogoutButton,
  LogoutButtonText,
  Error,
} from './styles';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('O nome de usuário é obrigatório'),
  name: Yup.string().required('O nome completo é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

const ProfileStack = createStackNavigator();

function Profile() {
  const {user, signOut, error} = useAuth();

  const [avatar, setAvatar] = useState(user.avatar || null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const nameRef = useRef();
  const emailRef = useRef();

  async function handleEditProfile(values) {
    const data = new FormData();

    data.append('avatar', avatar);
    data.append('username', values.username);
    data.append('name', values.name);
    data.append('email', values.email);

    try {
      await api.put('/me/edit', data);
    } catch (err) {
      console.error(err.response.data.message);
    }
  }

  function handleSelectAvatar() {
    ImagePicker.showImagePicker(upload => {
      if (upload.didCancel) {
        console.log('User cancelled image picker');
      } else if (upload.error) {
        console.log('ImagePicker Error: ', upload.error);
      } else if (upload.customButton) {
        console.log('User tapped custom button: ', upload.customButton);
      } else {
        const previewImg = {
          uri: `data:image/jpeg;base64,${upload.data}`,
        };

        let prefix;
        let ext;

        if (upload.fileName) {
          [prefix, ext] = upload.fileName.split('.');
          ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
        } else {
          prefix = new Date().getTime();
          ext = 'jpg';
        }

        const img = {
          uri: upload.uri,
          type: upload.type,
          name: `${prefix}.${ext}`,
        };

        setAvatarPreview(previewImg);
        setAvatar(img);
      }
    });
  }

  return (
    <Container>
      {!avatarPreview ? (
        <ImagePreview
          source={{
            uri: `http://10.0.2.2:3333/api/static/images/avatar/${user.avatar}`,
          }}
        />
      ) : (
        <ImagePreview source={avatarPreview} />
      )}

      <ImagePreviewButton onPress={handleSelectAvatar}>
        <ImagePreviewButtonText>Editar avatar</ImagePreviewButtonText>
      </ImagePreviewButton>

      <Formik
        enableReinitialize
        initialValues={{
          username: user.username,
          name: user.name,
          email: user.email,
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleEditProfile(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          isSubmitting,
          values,
        }) => (
          <>
            <Input
              placeholder="Nome de usuário"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              autoCompleteType="username"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => nameRef.current.focus()}
            />
            {errors.username && (
              <Error>
                <ErrorMessage name="username" />
              </Error>
            )}

            <Input
              placeholder="Nome completo"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              autoCompleteType="name"
              autoCorrect={false}
              autoCapitalize="words"
              ref={nameRef}
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
            />
            {errors.name && (
              <Error>
                <ErrorMessage name="name" />
              </Error>
            )}

            <Input
              placeholder="Endereço de email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              autoCompleteType="email"
              autoCorrect={false}
              autoCapitalize="none"
              ref={emailRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
            />
            {errors.email && (
              <Error>
                <ErrorMessage name="email" />
              </Error>
            )}

            <EditProfileButton onPress={handleSubmit}>
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <EditProfileButtonText>Salvar</EditProfileButtonText>
              )}
            </EditProfileButton>

            {error && <Error>{error}</Error>}
          </>
        )}
      </Formik>

      <LogoutButton onPress={signOut}>
        <LogoutButtonText>Logout</LogoutButtonText>
      </LogoutButton>
    </Container>
  );
}

export default function ProfileScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
}
