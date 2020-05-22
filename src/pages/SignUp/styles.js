import {Platform} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 0 20px;
`;

export const Logo = styled.Image`
  height: 70px;
  width: 100%;
  margin-bottom: 15px;
`;

export const Input = styled.TextInput`
  padding: 15px 20px;
  border-radius: 5px;
  background: #fff;
  align-self: stretch;
  margin-top: 15px;
  font-size: 16px;
`;

export const SignUpButton = styled.TouchableOpacity`
  padding: 15px 20px;
  border-radius: 5px;
  background: #0095f6;
  align-self: stretch;
  margin: 15px 0;
  font-size: 16px;
  align-items: center;
`;

export const SignUpButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const SignInText = styled.Text`
  color: #8e8e8e;
  font-size: 16px;
`;

export const SignInButtonText = styled.Text`
  color: #0095f6;
  font-size: 16px;
`;

export const Error = styled.Text`
  color: red;
  align-self: flex-start;
`;
