import introductionTemplate from "ovh-ui-guidelines/README.md";
import templateUtils from "src/utils/template-utils";

const templates = templateUtils.loadGuidelinesReadme();

export default function ($stateProvider) {
    "ngInject";

    $stateProvider
        .state("showcase.oui-guidelines", {
            url: "/oui-guidelines",
            friendlyName: "Guidelines",
            groupName: "OVH UI Guidelines",
            redirectTo: "showcase.oui-guidelines.introduction",
            template: "<ui-view></ui-view>",
            weight: 9000,
            groups: {
                base: {
                    name: "Base",
                    weight: 9000
                },
                components: {
                    name: "Components",
                    weight: 8000
                },
                principles: {
                    name: "Principles",
                    weight: 7000
                },
                templates: {
                    name: "Templates",
                    weight: 6000
                }
            }
        })
        .state("showcase.oui-guidelines.introduction", {
            url: "/introduction",
            friendlyName: "Introduction",
            template: introductionTemplate
        });

    templateUtils.addGuidelinesComponentStates($stateProvider, templates);
}
