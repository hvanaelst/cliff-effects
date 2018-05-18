// REACT COMPONENTS
import React from 'react';
import { Form } from 'semantic-ui-react';

// PROJECT COMPONENTS
import { FormPartsContainer, ControlledRadioYesNo } from './formHelpers';

// COMPONENT HELPER FUNCTIONS
import { getTimeSetter } from '../utils/getTimeSetter';


const LocalizedRadioYesNo = function ({ translate, checked, name, onChange }) {

  return (
    <ControlledRadioYesNo
      checked   = { checked }
      labelText = { translate(name + '.label') }
      name      = { name }
      onChange  = { onChange } />
  );
};


/** 
 * @todo Add 'vertical list of options' creator that will create a list of fields using the `.field-aligner` class
 *
 * @function
 * @param {object} props See below.
 * @property {object} props.current Client current info.
 * @property {function} props.setClientProperty Updates state upstream.
 * @property {function} props.translate Uses user chosen language-specific
 *    snippets.
 *
 * @returns {object} Component
 */
const CurrentBenefitsContent = ({ current, setClientProperty, translate }) => {

  return (
    <div >
      <LocalizedRadioYesNo
        checked   = { current.hasSection8 }
        name      = { 'hasSection8' }
        onChange  = { setClientProperty }
        translate = { translate } />
      <LocalizedRadioYesNo
        checked   = { current.hasSnap }
        name      = { 'hasSnap' }
        onChange  = { setClientProperty }
        translate = { translate } />
    </div>
  );  // end return

};  // End CurrentBenefitsContent()


/** @todo Abstract all the step components?
 *
 * @function
 * @param {object} props See below.
 * @property {function} props.changeClient Updates state upstream.
 * @property {function} props.translate Uses user chosen language-specific
 *    snippets.
 * @property {object} props.client JSON object with future and current values.
 * @property {function} props.nextStep Go to next form section.
 *
 * @returns {object} Component
 */
const CurrentBenefitsStep = ({ changeClient, nextStep, client, translate }) => {

  /** @todo Abstract `getTimeSetter()` use to VisitPage.js? */
  const setTimeProp = getTimeSetter('current', changeClient);

  return (
    <Form
      size='massive'
      className='household-size-form flex-item flex-column'>
      <FormPartsContainer
        title     = { 'Current Benefits' }
        clarifier = { 'Select the benefits you currently receive.' }
        right     = {{ name: 'Next', func: nextStep }}>
        <CurrentBenefitsContent
          setClientProperty = { setTimeProp }
          current           = { client.current }
          translate         = { translate } />
      </FormPartsContainer>

    </Form>
  );

};  // End CurrentBenefitsStep()

export { CurrentBenefitsStep };