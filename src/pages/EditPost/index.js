import React, {useState, useRef} from 'react';
import {ActivityIndicator} from 'react-native';
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import api from '../../services/api';

import {
  Container,
  ImagePreview,
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

import {REACT_APP_API_URL} from 'react-native-dotenv';

export default function EditPost({route, navigation}) {
  const {postId, postImage, place, description, hashtags} = route.params;

  const [error, setError] = useState(null);

  const descriptionRef = useRef();
  const hashtagsRef = useRef();

  async function handleEditPost(values) {
    const data = {
      place: values.place,
      description: values.description,
      hashtags: values.hashtags,
    };

    try {
      await api.put(`/posts/${postId}`, data);

      navigation.navigate('Feed');
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <Container>
      {postImage && (
        <ImagePreview
          source={{
            uri: `${REACT_APP_API_URL}/static/images/post/${postImage}`,
          }}
        />
      )}

      <Formik
        enableReinitialize
        initialValues={{
          place: place,
          description: description,
          hashtags: hashtags,
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleEditPost(values)}>
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
                <PostButtonText>Editar</PostButtonText>
              )}
            </PostButton>

            {error && <Error>{error}</Error>}
          </>
        )}
      </Formik>
    </Container>
  );
}
