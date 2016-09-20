import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies,
import React from "react";
import DataForm from "form/DataForm";// eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved
import TextInput from "inputs/TextInput";// eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved
import { mount } from "enzyme";// eslint-disable-line import/no-extraneous-dependencies

describe("form/DataForm", () => {
    let fields = [
        {
            label: "id",
            type: "string",
            name: "id",
            tooltip: "id",
            visible: false
        },
        {
            label: "Name",
            type: "string",
            name: "name",
            tooltip: "Name"
        },
        {
            label: "Surname",
            type: "string",
            name: "surname",
            tooltip: "Surname"
        }
    ];
    const getComponent = (props: Object): Object => {
        return (<DataForm {...props} />); // eslint-disable-line react/jsx-filename-extension
    };

    let value;
    const handleChange = (code: string, e: Object): boolean => {
        value = e.target.value;
        console.log("handleChange", e);
        return true;
    };
    it("render", () => {
        let wrapper = mount(getComponent({ fields: fields }));
        chai.assert.equal(wrapper.find(DataForm).length, 1);
        chai.assert.equal(wrapper.find(TextInput).length, 2);

        fields[0].name = "";
        chai.assert.throws(() => {
            wrapper = mount(getComponent({ fields: fields }));
        }, "Field name must define ! ");

        fields[0].name = "id";
        wrapper = mount(getComponent({ fields: fields }));

        chai.assert.equal(wrapper.instance().isValid(), false);

        wrapper.setState({ name: "Hasan" });
        chai.assert.equal(wrapper.instance().isValid(), true);
    });

    it("onChange", () => {
        fields[1].onChange = handleChange;
        let wrapper = mount(getComponent({ fields: fields }));
        wrapper.setState({ name: "Hasan" });
        // chai.assert.equal(value, "Hasan");
    });

    it("getItem", () => {
        let wrapper = mount(getComponent({ fields: fields }));
        wrapper.setState({ name: "Hasan" });
        let item = wrapper.instance().getItem();

        console.log("ITEM is ", item);
        // chai.assert.equal(item.name, "Hasan");
    });

    it("submit", () => {
        let wrapper = mount(getComponent({ fields: fields, onChange: handleChange }));
        let item = wrapper.instance().submit();
        chai.assert.equal(item, false);
        wrapper.setState({ name: "Hasan" });
    });
});