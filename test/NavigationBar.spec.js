import { shallow, createLocalVue } from "vue-test-utils";
import { createRenderer } from "vue-server-renderer";
import Vuex from "vuex";

import NavigationBar from "@/components/NavigationBar";
import * as actionTypes from "@/store/actionTypes";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("NavigationBar.vue when logged in", () => {
    let wrapper;

    let actions;
    let state;
    let store;

    beforeEach(() => {
        actions = {
            [actionTypes.LOGOUT]: jest.fn(),
        };
        state = {
            auth: {
                loggedIn: true,
            },
            user: {
                username: "Username",
            },
        };
        store = new Vuex.Store({
            actions,
            state,
        });

        wrapper = shallow(NavigationBar, { store, localVue });
    });

    it("matches snapshot", () => {
        const renderer = createRenderer();
        renderer.renderToString(wrapper.vm, (err, str) => {
            if (err) throw new Error(err);
            expect(str).toMatchSnapshot();
        });
    });

    it("has a user navbar item", () => {
        const item = wrapper.find(".navbar-menu > .navbar-end > .navbar-item");
        const label = item.find(".navbar-link span");
        expect(label.text()).toBe(`Welcome, ${state.user.username}`);
    });

    it("has a user dropdown", () => {
        const item = wrapper.find(".navbar-menu > .navbar-end > .navbar-item");
        expect(item.hasClass("has-dropdown")).toBe(true);
        expect(item.findAll(".navbar-dropdown")).toHaveLength(1);
        expect(item.findAll(".navbar-dropdown > .navbar-item")).toHaveLength(1);
    });
});
