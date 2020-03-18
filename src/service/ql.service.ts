import { ApolloQLService } from './apollo.service';

export class GQLService {
    protected aplClient: ApolloQLService;
    constructor() {
        this.aplClient = ApolloQLService.Instance;
    }

    initialize() {
        if(this.aplClient) {
            this.aplClient.initialize();
        }
    }

    reset() {
        if(this.aplClient) {
            this.aplClient.reset();
        }
    }
}