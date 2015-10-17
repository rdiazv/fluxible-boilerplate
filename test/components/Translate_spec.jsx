import { expect, React, ReactDOM, TestUtils, createMockComponentContext, provideContext } from '../spec_helper';
import Translate from '../../app/components/Translate';
import TranslationsStore from '../../app/stores/TranslationsStore';

describe('Translate', () => {
  let component;
  let domElement;
  let componentContext;
  let MockTranslate = provideContext(Translate);

  function renderComponent(props = {}) {
    componentContext = createMockComponentContext({
      stores: [TranslationsStore]
    });

    component = TestUtils.renderIntoDocument(
      <MockTranslate content="test"
        context={componentContext}
        {...props}
        />
    );

    domElement = ReactDOM.findDOMNode(component);
  }

  beforeEach(() => {
    renderComponent();
  });

  it('debe ser un componente', () => {
    expect(TestUtils.isCompositeComponentWithType(component, MockTranslate)).to.be.true
  });
});
