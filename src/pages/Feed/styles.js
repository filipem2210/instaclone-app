import styled from 'styled-components/native';

export const LogoImage = styled.Image`
  margin-left: -30px;
  margin-bottom: -5px;
`;

export const DirectImage = styled.Image`
  margin-bottom: -8px;
`;

export const Container = styled.View`
  flex: 1;
`;

export const Post = styled.View`
  margin-bottom: 20px;
`;

export const PostHeader = styled.View`
  padding: 15px 15px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PostInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AvatarImage = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-right: 15px;
`;

export const Username = styled.Text`
  font-size: 14px;
  color: #000;
  font-weight: bold;
`;

export const Place = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const HeaderActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const More = styled.Image`
  transform: rotate(90deg);
`;

export const PostImage = styled.Image`
  width: 100%;
  height: 400px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const PostFooter = styled.View`
  padding: 0 15px;
`;

export const FooterActions = styled.View`
  flex-direction: row;
`;

export const Like = styled.TouchableOpacity`
  margin-right: 8px;
`;

export const LikeIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

export const Comment = styled.TouchableOpacity`
  margin-right: 8px;
`;

export const Send = styled.TouchableOpacity`
  margin-right: 8px;
`;

export const Likes = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #000;
`;

export const UsernameDescription = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Description = styled.Text`
  line-height: 18px;
`;

export const Hashtags = styled.Text`
  color: #3742fa;
`;

export const ActionIcon = styled.TouchableOpacity`
  margin-right: 10px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#0095f6',
})`
  margin: 30px 0;
`;
