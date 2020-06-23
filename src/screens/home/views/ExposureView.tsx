import React, {useCallback} from 'react';
import {Linking} from 'react-native';
import {useI18n} from '@shopify/react-i18n';
import {Text, Button, Box, ButtonMultiline} from 'components';
import {useStorage} from 'services/StorageService';

import {BaseHomeView} from '../components/BaseHomeView';

export const ExposureView = () => {
  const {region} = useStorage();
  const [i18n] = useI18n();
  const onActionGuidance = useCallback(() => {
    let url = i18n.translate(`RegionalGuidanceURL.CA`);
    if (region !== undefined && region !== 'None') {
      const regionalURL = i18n.translate(`RegionalGuidanceURL.${region}`);
      if (regionalURL !== '') {
        url = regionalURL;
      }
    }
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }, [i18n, region]);

  const onActionHow = useCallback(() => {
    Linking.openURL(i18n.translate('Home.HowUrl')).catch(err => console.error('An error occurred', err));
  }, [i18n]);

  return (
    <BaseHomeView iconName="hand-caution">
      <Text variant="bodyTitle" color="bodyText" marginBottom="l" accessibilityRole="header">
        {i18n.translate('Home.ExposureDetected.Title')}
        {/* No exposure detected */}
      </Text>
      <Text variant="bodyText" color="bodyText" marginBottom="l">
        {i18n.translate('Home.ExposureDetected.Detailed1')}
      </Text>

      <Text variant="bodyText" color="bodyText" marginBottom="l">
        {i18n.translate('Home.ExposureDetected.Detailed2')}
      </Text>

      {/* <LastCheckedDisplay /> */}
      <Box alignSelf="stretch" marginTop="l" marginBottom="s">
        <Button
          text={i18n.translate('Home.SeeGuidance')}
          variant="bigFlatPurple"
          externalLink
          onPress={onActionGuidance}
        />
      </Box>
      <Box alignSelf="stretch" marginTop="s" marginBottom="l">
        <ButtonMultiline
          text={i18n.translate('Home.ExposureDetected.DiagnosedBtnText1')}
          text1={i18n.translate('Home.ExposureDetected.DiagnosedBtnText2')}
          variant="bigFlat"
          internalLink
          onPress={onActionHow}
        />
      </Box>
    </BaseHomeView>
  );
};
