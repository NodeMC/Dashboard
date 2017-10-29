import { shallow } from "vue-test-utils";
import { createRenderer } from "vue-server-renderer";

import NotFoundPage from "@/components/NotFoundPage";

describe("NotFoundPage.vue", () => {
    it("matches snapshot", () => {
        const renderer = createRenderer();
        const wrapper = shallow(NotFoundPage);
        renderer.renderToString(wrapper.vm, (err, str) => {
            if (err) throw new Error(err);
            expect(str).toMatchSnapshot();
        });
    });
});
