import React, {useRef} from 'react';
import {TouchableOpacity, ActivityIndicator} from 'react-native';
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import {useAuth} from '../../contexts/auth';

import {
  Container,
  Logo,
  Input,
  SignInButton,
  SignInButtonText,
  SignUpText,
  SignUpButtonText,
  Error,
} from './styles';

import logo from '../../assets/logo.png';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha precisa de no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignInScreen({navigation}) {
  const passwordRef = useRef();

  const {signIn, error} = useAuth();

  function handleSignIn(data) {
    signIn(data);
  }

  return (
    <Container>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={values => handleSignIn(values)}>
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
              placeholder="Endereço de email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCompleteType="email"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            {errors.email && (
              <Error>
                <ErrorMessage name="email" />
              </Error>
            )}

            <Input
              placeholder="Senha"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              autoCompleteType="off"
              maxLength={10}
              ref={passwordRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              secureTextEntry
            />
            {errors.password && (
              <Error>
                <ErrorMessage name="password" />
              </Error>
            )}

            <SignInButton onPress={handleSubmit}>
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <SignInButtonText>Entrar</SignInButtonText>
              )}
            </SignInButton>

            {error && <Error>{error}</Error>}
          </>
        )}
      </Formik>

      <SignUpText>Não tem uma conta?</SignUpText>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <SignUpButtonText>Registre-se</SignUpButtonText>
      </TouchableOpacity>
    </Container>
  );
}
