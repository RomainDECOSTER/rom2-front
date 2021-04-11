import { Grid } from '@material-ui/core';
import { CheckboxField } from 'components/CheckboxField';
import { Selector } from 'components/Selector';
import { TextInput } from 'components/TextInput';
import { injectIntl } from 'react-intl';
import { ComonEnums } from 'services/comon';
import { ArrayUtils, ValueUtils } from 'tools';

const vod = ValueUtils.valueOrDefault;

function AddressFormComponent(props) {
  const { data, setData } = props;
  const intl = props.intl.messages.scenes.common.general_information;
  const fields = {
    address_description: vod(data.address_description, ''),
    district: vod(data.district, ''),
    city: vod(data.city, ''),
    zip_code: vod(data.zip_code, ''),
    district_priority: vod(data.district_priority, false),
  };

  // General
  const neighbourhoods = ComonEnums.getDistrictArray();

  function setFieldFunction(field) {
    return value => {
      const newAddress = ArrayUtils.copyJsonObjectArray(fields);
      newAddress[field] = value;
      setData(newAddress);
    };
  }

  return (
    <Grid container item xs={12} sm={12}>
      <Grid item xs={12} sm={12}>
        <TextInput
          name="address_description"
          label={intl.labels.address_description}
          value={fields.address_description}
          setField={setFieldFunction('address_description')}
          disabled={fields.loading}
          required={false}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextInput
          name="city"
          label={intl.labels.city}
          value={fields.city}
          setField={setFieldFunction('city')}
          disabled={fields.loading}
          required={false}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextInput
          name="zip_code"
          label={intl.labels.zip_code}
          value={fields.zip_code}
          setField={setFieldFunction('zip_code')}
          disabled={fields.loading}
          required={false}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Selector
          labelId="district"
          label={intl.labels.district}
          selected={fields.district}
          setSelected={setFieldFunction('district')}
          items={neighbourhoods}
          disabled={fields.loading}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <CheckboxField
          label={intl.labels.district_priority}
          checked={fields.district_priority ? fields.district_priority : false}
          setField={setFieldFunction('district_priority')}
          disabled={fields.loading}
        />
      </Grid>
    </Grid>
  );
}

const AddressForm = injectIntl(AddressFormComponent);

export { AddressForm };
