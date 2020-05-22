import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ImagePicker from 'react-native-image-picker';

import IconFeather from 'react-native-vector-icons/Feather';

import io from 'socket.io-client';

import api from '../../services/api';

import {
  LogoImage,
  DirectImage,
  Container,
  Post,
  PostHeader,
  PostInfo,
  AvatarImage,
  Username,
  Place,
  HeaderActions,
  More,
  PostImage,
  PostFooter,
  FooterActions,
  Like,
  LikeIcon,
  Comment,
  Send,
  Likes,
  UsernameDescription,
  Description,
  Hashtags,
  Loading,
  ActionIcon,
} from './styles';

import DirectScreen from '../Direct';
import EditPostScreen from '../EditPost';

import logo from '../../assets/logo.png';
import camera from '../../assets/camera.png';
import direct from '../../assets/send.png';
import more from '../../assets/more.png';
import zero_likes from '../../assets/like.png';
import heart from '../../assets/heart.png';
import comment from '../../assets/comment.png';
import send from '../../assets/send.png';

const FeedStack = createStackNavigator();

const imagePickerOptions = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

function Feed({navigation}) {
  const [feed, setFeed] = useState([]);
  const [loggedUser, setLoggedUser] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastTap, setLastTap] = useState(null);

  async function loadPosts(pageNumber = page, shouldRefresh = false) {
    if (loading) {
      return;
    }

    if (total && pageNumber > total) {
      return;
    }

    setLoading(true);

    try {
      const posts = await api.get('posts', {
        params: {
          page: pageNumber,
        },
      });

      const totalItems = posts.headers['x-total-count'];

      setFeed(shouldRefresh ? posts.data.feed : [...feed, ...posts.data.feed]);
      setLoggedUser(posts.data.user);
      setTotal(Math.ceil(totalItems / 5));
      setPage(pageNumber + 1);
      setLoading(false);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  async function handleLikePost(id) {
    try {
      await api.post(`/posts/${id}/like`);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  async function handleDoubleTap(id) {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 500;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      try {
        await handleLikePost(id);
      } catch (error) {
        console.error(error.response.data.message);
      }
    } else {
      setLastTap(now);
    }
  }

  async function handleDeletePost(id) {
    try {
      await api.delete(`/posts/${id}`);

      setFeed(prevFeed => {
        return prevFeed.filter(post => post.id !== id);
      });
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  const registerToSocket = useCallback(() => {
    const socket = io('http://10.0.2.2:3333');

    socket.on('post', newPost => {
      setFeed(prevFeed => {
        return [newPost, ...prevFeed];
      });
    });

    socket.on('like', likedPost => {
      setFeed(prevFeed => {
        return prevFeed.map(post =>
          post.id === likedPost.id ? likedPost : post,
        );
      });
    });
  }, []);

  async function refreshList() {
    setRefreshing(true);

    await loadPosts(1, true);

    setRefreshing(false);
  }

  useEffect(() => {
    loadPosts();

    registerToSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerToSocket]);

  return (
    <Container>
      <FlatList
        data={feed}
        keyExtractor={post => `${post.id}`}
        onEndReached={() => loadPosts()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={loading && <Loading />}
        scrollToIndex={0}
        renderItem={({item: post}) => (
          <Post>
            <PostHeader>
              <PostInfo>
                <AvatarImage
                  source={{
                    uri: `http://10.0.2.2:3333/api/static/images/avatar/${
                      post.user.avatar
                    }`,
                  }}
                />
                <View>
                  <Username>{post.user.username}</Username>
                  <Place>{post.place}</Place>
                </View>
              </PostInfo>
              <HeaderActions>
                {loggedUser.id === post.user.id && (
                  <>
                    <ActionIcon
                      onPress={() =>
                        navigation.navigate('EditPost', {
                          postId: post.id,
                          postImage: post.image,
                          place: post.place,
                          description: post.description,
                          hashtags: post.hashtags,
                        })
                      }>
                      <IconFeather name="edit" size={18} color="#0095f6" />
                    </ActionIcon>
                    <ActionIcon onPress={() => handleDeletePost(post.id)}>
                      <IconFeather name="trash-2" size={18} color="#e74c3c" />
                    </ActionIcon>
                  </>
                )}
                <More source={more} />
              </HeaderActions>
            </PostHeader>

            <TouchableWithoutFeedback onPress={() => handleDoubleTap(post.id)}>
              <PostImage
                source={{
                  uri: `http://10.0.2.2:3333/api/static/images/post/${
                    post.image
                  }`,
                }}
              />
            </TouchableWithoutFeedback>

            <PostFooter>
              <FooterActions>
                <Like onPress={() => handleLikePost(post.id)}>
                  {post.likes > 0 ? (
                    <LikeIcon source={heart} />
                  ) : (
                    <LikeIcon source={zero_likes} />
                  )}
                </Like>
                <Comment onPress={() => {}}>
                  <Image source={comment} />
                </Comment>
                <Send onPress={() => {}}>
                  <Image source={send} />
                </Send>
              </FooterActions>

              <Likes>
                {post.likes} {post.likes === 1 ? 'curtida' : 'curtidas'}
              </Likes>
              <UsernameDescription>
                <Username>{post.user.username} </Username>
                <Description>{post.description}</Description>
              </UsernameDescription>
              <Hashtags>{post.hashtags}</Hashtags>
            </PostFooter>
          </Post>
        )}
      />
    </Container>
  );
}

export default function FeedScreen() {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="Feed"
        component={Feed}
        options={({navigation}) => ({
          headerTitle: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
              <LogoImage source={logo} alt="Logo" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                ImagePicker.launchCamera(imagePickerOptions, response => {
                  if (!response.didCancel) {
                    navigation.navigate('NewPost', {
                      screen: 'NewPost',
                      params: {imagePreview: response.data},
                    });
                  }
                });
              }}>
              <Image source={camera} alt="New Post" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Direct')}>
              <DirectImage source={direct} alt="Direct" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#f5fcff',
          },
          headerLeftContainerStyle: {
            marginLeft: 10,
          },
          headerRightContainerStyle: {
            marginRight: 10,
          },
        })}
      />
      <FeedStack.Screen name="Direct" component={DirectScreen} />
      <FeedStack.Screen name="EditPost" component={EditPostScreen} />
    </FeedStack.Navigator>
  );
}
