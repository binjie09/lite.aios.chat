import React, { useCallback } from 'react';
import { Form, Tabs, Tooltip } from '@douyinfe/semi-ui';
import { IconHelpCircle } from '@douyinfe/semi-icons';
import PromptStore from '@/components/prompt-store';
import { ConfigSettingProps } from './ConfigSetting';
import { Config } from '@/global';

const API_HOST: string = import.meta.env.VITE_API_HOST;

const ConfigSetting: React.FC<ConfigSettingProps> = function ConfigSetting(props) {
  const { handleConfigChange, config, tips } = props;

  const handleValuesChange = useCallback((values: Config) => {
    handleConfigChange(values);
  }, [handleConfigChange]);

  const labelTips = useCallback((content: string) => (
    <Tooltip content={content}><IconHelpCircle className="pt-[2px]" /></Tooltip>
  ), []);

  return (
    <Tabs>
      <Tabs.TabPane tab="General" itemKey="1">
        <Form labelPosition="left" onValueChange={handleValuesChange}>
          {tips ? <div className="text-[#ff0000]">{tips}</div> : null}
          <Form.Select field="model" initValue={config.model || 'gpt-3.5-turbo'} disabled />
          <Form.Input field="apiHost" initValue={config.apiHost || API_HOST} showClear />
          <Form.Input field="apiKey" initValue={config.apiKey} showClear />
          <Form.Slider
            field="temperature"
            initValue={config.temperature ?? 0.8}
            label={{ text: 'temperature', extra: labelTips('A higher value will make the output more random.') }}
            min={0}
            max={2}
            step={0.1}
            marks={{ 0: '0', 1: '1', 2: '2' }}
          />
          <Form.Slider
            field="presence_penalty"
            initValue={config.presence_penalty ?? -1.0}
            label={{ text: 'presence_penalty', extra: labelTips('A higher value will make it easier to shift the conversation topic.') }}
            min={-2}
            max={2}
            step={0.1}
            marks={{
              '-2': '-2', '-1': '-1', 0: '0', 1: '1', 2: '2'
            }}
          />
          <Form.Slider
            field="frequency_penalty"
            initValue={config.frequency_penalty ?? 1.0}
            label={{ text: 'frequency_penalty', extra: labelTips('The higher the value, the lower the repetition rate of the output.') }}
            min={-2}
            max={2}
            step={0.1}
            marks={{
              '-2': '-2', '-1': '-1', 0: '0', 1: '1', 2: '2'
            }}
          />
          <Form.Switch field="stream" initValue={config.stream} />
        </Form>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Prompt Store" itemKey="2">
        <PromptStore />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default ConfigSetting;
