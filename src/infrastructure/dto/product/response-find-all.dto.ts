import { Expose } from 'class-transformer';

export class ResponseFindAllDto {
    @Expose({ name: 'results' })
    results: any;

    @Expose({ name: 'hasNextPage' })
    hasNextPage: number;

    @Expose({ name: 'nextPageToken' })
    nextPageToken: number;

}
