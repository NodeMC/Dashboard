import { shallow } from "vue-test-utils";
import { createRenderer } from "vue-server-renderer";

import LayoutCentred from "@/components/LayoutCentred";

describe("LayoutCentred.vue", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(LayoutCentred);
    });

    it("matches snapshot", () => {
        const renderer = createRenderer();
        renderer.renderToString(wrapper.vm, (err, str) => {
            if (err) throw new Error(err);
            expect(str).toMatchSnapshot();
        });
    });

    it("has a centred column", () => {
        expect(wrapper.hasClass("columns")).toBe(true);
        expect(wrapper.findAll(".column")).toHaveLength(1);
        expect(wrapper.find(".column").hasClass("is-half")).toBe(true);
    });

    it("doesn't have a title if none is given", () => {
        expect(wrapper.findAll("h1.title")).toHaveLength(0);
    });

    it("has a title if one is specified", () => {
        const title = "Title";
        const testWrapper = shallow(LayoutCentred, {
            propsData: {
                title,
            },
        });
        expect(testWrapper.findAll("h1.title")).toHaveLength(1);

        const h1 = testWrapper.find("h1.title");
        expect(h1.text()).toBe(title);
    });

    it("renders content in its slot", () => {
        const testWrapper = shallow(LayoutCentred, {
            slots: {
                default: `<div class="fake-content"></div>`,
            },
        });
        expect(testWrapper.findAll(".fake-content")).toHaveLength(1);
    });
});
