import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | cf-field/input/checkbox", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    assert.expect(12);

    await render(hbs`
      {{cf-field/input/checkbox
        field=(hash
          id="test"
          answer=(hash
            listValue=(array "option-1" "option-2")
          )
          question=(hash
            checkboxOptions=(hash
              edges=(array
                (hash node=(hash slug="option-1" label="Option 1"))
                (hash node=(hash slug="option-2" label="Option 2"))
                (hash node=(hash slug="option-3" label="Option 3"))
              )
            )
          )
        )
      }}
    `);

    assert.dom("input[type=checkbox]").exists({ count: 3 });
    assert.dom("label").exists({ count: 3 });
    assert.dom("br").exists({ count: 2 });
    assert.dom("label:nth-of-type(3) + br").doesNotExist();

    assert.dom("label:nth-of-type(1)").hasText("Option 1");
    assert.dom("label:nth-of-type(2)").hasText("Option 2");
    assert.dom("label:nth-of-type(3)").hasText("Option 3");

    assert
      .dom("label:nth-of-type(1) input[type=checkbox]")
      .hasValue("option-1");
    assert
      .dom("label:nth-of-type(2) input[type=checkbox]")
      .hasValue("option-2");
    assert
      .dom("label:nth-of-type(3) input[type=checkbox]")
      .hasValue("option-3");

    assert.dom("label:nth-of-type(1) input[type=checkbox]").isChecked();
    assert.dom("label:nth-of-type(2) input[type=checkbox]").isChecked();
  });
});