import { ApolloQLService } from './apollo.service';

export class GQLService {
    protected aplClient: ApolloQLService;
    constructor() {
        this.aplClient = ApolloQLService.Instance;
    }
}