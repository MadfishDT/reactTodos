import { GQLService } from './ql.service'
import gql from "graphql-tag";

export class QLLabelInfoService extends GQLService {
    
    private static default: QLLabelInfoService;

    constructor() {
        super();
    }

    public static get Instance(): QLLabelInfoService {
        if (!QLLabelInfoService.default) {
            QLLabelInfoService.default = new QLLabelInfoService();
        }
        return QLLabelInfoService.default;
    }
    public addLable(title: string, color: string, desc?: string) {
        const mutateQL = gql`
            mutation AddLabel($qtitle: String, $qcolor: String, $qdesc: String){
                createLabel(title: $qtitle,
                            color: $qcolor,
                            desc: $qdesc) 
            }`
        return this.aplClient.clinet.mutate({
            mutation: mutateQL,
            variables: {
                qtitle: title,
                qcolor: color,
                qdesc: desc
            }
        })
    }
    public getLabels(quser: string) {

       const query = gql`
        query GetLabels($user: String!) {
            labels(user: $user) {
                title
                color
                updatedAt
            }
        }`;

        return this.aplClient.clinet.query({
            query: query,
            variables: {
                user: quser
            }
        });
    }
}