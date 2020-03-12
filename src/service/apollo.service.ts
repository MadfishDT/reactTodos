import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject  } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

export class ApolloQLService {

    private aplClient: ApolloClient<NormalizedCacheObject>;
    private static default: ApolloQLService;
    constructor() {
        this.aplClient = new ApolloClient({
            link: createHttpLink({ uri: "http://localhost:3001/gql" }),
            cache: new InMemoryCache()
        });
    }
    public get clinet() {
        return this.aplClient;
    }
    public static get Instance(): ApolloQLService {
        if (!ApolloQLService.default) {
            ApolloQLService.default = new ApolloQLService();
        }
        return ApolloQLService.default;
    }
}