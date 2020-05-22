import React, {useState, useRef} from 'react';
import {ActivityIndicator} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ImagePicker from 'react-native-image-picker';
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import api from '../../services/api';

import {
  Container,
  ImagePreview,
  ImagePreviewButton,
  ImagePreviewButtonText,
  Input,
  PostButton,
  PostButtonText,
  Error,
} from './styles';

const validationSchema = Yup.object().shape({
  place: Yup.string(),
  description: Yup.string().required('A descrição é obrigatória'),
  hashtags: Yup.string(),
});

const NewPostStack = createStackNavigator();

function NewPost({route, navigation}) {
  const params = route.params;

  let imgPrv;
  if (params) {
    imgPrv = {
      uri: `data:image/jpeg;base64,${params.imagePreview}`,
    };
  } else {
    imgPrv = null;
  }

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(imgPrv);
  const [error, setError] = useState(null);

  const descriptionRef = useRef();
  const hashtagsRef = useRef();

  async function handleNewPost(values) {
    const data = new FormData();

    data.append('image', image);
    data.append('place', values.place);
    data.append('description', values.description);
    data.append('hashtags', values.hashtags);

    try {
      await api.post('/posts', data);

      navigation.navigate('Feed');
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  function handleSelectImage() {
    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const previewImg = {
          uri: `data:image/jpeg;base64,${response.data}`,
        };

        let prefix;
        let ext;

        if (response.fileName) {
          [prefix, ext] = response.fileName.split('.');
          ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
        } else {
          prefix = new Date().getTime();
          ext = 'jpg';
        }

        const img = {
          uri: response.uri,
          type: response.type,
          name: `${prefix}.${ext}`,
        };

        setPreview(previewImg);
        setImage(img);
      }
    });
  }

  return (
    <Container>
      {preview && <ImagePreview source={preview} />}

      <ImagePreviewButton onPress={handleSelectImage}>
        <ImagePreviewButtonText>
          {!preview ? 'Selecionar imagem' : 'Editar imagem'}
        </ImagePreviewButtonText>
      </ImagePreviewButton>

      <Formik
        initialValues={{place: '', description: '', hashtags: ''}}
        validationSchema={validationSchema}
        onSubmit={values => handleNewPost(values)}>
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
              placeholder="Local"
              value={values.place}
              onChangeText={handleChange('place')}
              onBlur={handleBlur('place')}
              autoCompleteType="off"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => descriptionRef.current.focus()}
            />

            <Input
              placeholder="Descriçâo"
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              autoCompleteType="off"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              ref={descriptionRef}
              onSubmitEditing={() => descriptionRef.current.focus()}
            />
            {errors.description && (
              <Error>
                <ErrorMessage name="description" />
              </Error>
            )}

            <Input
              placeholder="Hashtags"
              value={values.hashtags}
              onChangeText={handleChange('hashtags')}
              onBlur={handleBlur('hashtags')}
              autoCompleteType="off"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="send"
              ref={hashtagsRef}
              onSubmitEditing={handleSubmit}
            />

            <PostButton onPress={handleSubmit}>
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <PostButtonText>Compartilhar</PostButtonText>
              )}
            </PostButton>

            {error && <Error>{error}</Error>}
          </>
        )}
      </Formik>
    </Container>
  );
}

export default function NewPostScreen() {
  return (
    <NewPostStack.Navigator>
      <NewPostStack.Screen
        name="NewPost"
        component={NewPost}
        options={() => ({
          headerTitle: 'New Post',
        })}
      />
    </NewPostStack.Navigator>
  );
}
