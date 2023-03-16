import ImageColors from 'react-native-image-colors';

export const getImageColors = async (path: string) => {
  const result = await ImageColors.getColors(path, {
    cache: true,
    fallback: '#228B22',
  });

  let primaryColor;
  let secondaryColor;

  switch (result.platform) {
    case 'android':
      // android result properties
      primaryColor = result.dominant || '#084F6A';
      secondaryColor = result.average || '#75CEDB';
      break;
    case 'web':
      // web result properties
      primaryColor = result.lightVibrant;
      break;
    case 'ios':
      // iOS result properties
      primaryColor = result.background;
      secondaryColor = result.secondary;
      break;
    default:
      throw new Error('Unexpected platform key');
  }

  return [primaryColor, secondaryColor];
};
