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

export const ImagePreviewButton = styled.TouchableOpacity`
  border-radius: 4px;
  border-width: 1px;
  border-color: #ccc;
  border-style: dashed;
  padding: 15px 20px;
  border-radius: 5px;
  background-color: transparent;
  align-self: stretch;
  font-size: 16px;
  align-items: center;
`;

export const ImagePreviewButtonText = styled.Text`
  font-size: 16px;
  color: #666;
`;

export const ImagePreview = styled.Image`
  width: 100%;
  max-width: 380px;
  height: 150px;
  margin-bottom: 10px;
  align-self: center;
  border-radius: 4px;
`;

export const Input = styled.TextInput`
  padding: 15px 20px;
  border-radius: 5px;
  background: #fff;
  align-self: stretch;
  margin-top: 15px;
  font-size: 16px;
`;

export const PostButton = styled.TouchableOpacity`
  padding: 15px 20px;
  border-radius: 5px;
  background: #0095f6;
  align-self: stretch;
  margin: 15px 0;
  font-size: 16px;
  align-items: center;
`;

export const PostButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const Error = styled.Text`
  color: red;
  align-self: flex-start;
`;
