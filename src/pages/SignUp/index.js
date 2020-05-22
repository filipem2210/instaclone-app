import React, {useRef} from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import {useAuth} from '../../contexts/auth';

import {
  Container,
  Logo,
  Input,
  SignUpButton,
  SignUpButtonText,
  SignInText,
  SignInButtonText,
  Error,
} from './styles';

import logo from '../../assets/logo.png';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('O nome de usuário é obrigatório'),
  name: Yup.string().required('O nome completo é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha precisa de no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignUpScreen({navigation}) {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const {signUp, error} = useAuth();

  function handleSignUp(data) {
    signUp(data);
  }

  return (
    <Container>
      <Formik
        initialValues={{username: '', name: '', email: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={values => handleSignUp(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          isSubmitting,
          values,
        }) => (
          <>
            <Logo source={logo} resizeMode="contain" />

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
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            {errors.email && (
              <Error>
                <ErrorMessage name="email" />
              </Error>
            )}

            <Input
              secureTextEntry
              placeholder="Senha"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              autoCompleteType="off"
              maxLength={10}
              ref={passwordRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
            />
            {errors.password && (
              <Error>
                <ErrorMessage name="password" />
              </Error>
            )}

            <SignUpButton onPress={handleSubmit}>
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <SignUpButtonText>Cadastre-se</SignUpButtonText>
              )}
            </SignUpButton>

            {error && <Error>{error}</Error>}
          </>
        )}
      </Formik>

      <SignInText>Tem uma conta?</SignInText>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <SignInButtonText>Conecte-se</SignInButtonText>
      </TouchableOpacity>
    </Container>
  );
}
