import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject  } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

type NormalizedCacheAplloclinet = ApolloClient<NormalizedCacheObject> | null;

export class ApolloQLService {

    private aplClient: NormalizedCacheAplloclinet;
    private static default: ApolloQLService;
    constructor() {
      this.aplClient = null;
      console.log('constructor apollo');
    }

    public async initialize() {
        return (await this.reset());
    }

    public reset(): Promise<NormalizedCacheAplloclinet>{
        return new Promise<NormalizedCacheAplloclinet>( resolve => {
            try {
                this.aplClient = new ApolloClient({
                    link: createHttpLink({ uri: "http://localhost:3001/gql" }),
                    cache: new InMemoryCache()
                });
                resolve(this.aplClient);
            } catch(e) {
                resolve(null);
            }
        });
        
    }

    public get client() {
        return this.aplClient;
    }

    public get mutate() {
        if(this.aplClient) {
            return this.aplClient.mutate;
        } else {
            return () => {};
        }
    }

    public get query() {
        if(this.aplClient) {
            return this.aplClient.query;
        } else {
            return () => {};
        }
    }

    public static get Instance(): ApolloQLService {
        if (!ApolloQLService.default) {
            ApolloQLService.default = new ApolloQLService();
        }
        return ApolloQLService.default;
    }
}