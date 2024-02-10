import { useSettings } from "./useSettings";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value.trim()) return;

    updateSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          defaultValue={minBookingLength}
          id="min-nights"
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          disabled={isUpdating}
          type="number"
          defaultValue={maxBookingLength}
          id="max-nights"
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          disabled={isUpdating}
          type="number"
          defaultValue={maxGuestsPerBooking}
          id="max-guests"
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          disabled={isUpdating}
          type="number"
          defaultValue={breakfastPrice}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
