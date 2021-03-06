import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import { get } from "@ember/object";
import { RouteQueryManager } from "ember-apollo-client";
import gql from "graphql-tag";

export default Route.extend(RouteQueryManager, {
  apollo: service(),

  async model() {
    const res = await this.apollo.watchQuery(
      {
        query: gql`
          query {
            allDocuments {
              edges {
                node {
                  id
                }
              }
            }
          }
        `
      },
      "allDocuments.edges"
    );

    return get(res, "firstObject.node");
  }
});
