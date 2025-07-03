import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from 'react';
import SettingForm from '@/components/SettingsForm';

const Settings = () => {

  return (
    <Fragment>
      <h1>{__('AI Search Settings', 'ploogins-ai-assistant')}</h1>
      <hr />
      <SettingForm />
    </Fragment>
  );
}

export default Settings;