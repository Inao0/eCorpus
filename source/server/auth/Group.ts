
export default class StoredGroup {
    group_id: number;
    group_name: string;
    scenes? : Object;
    members? : string[];

    constructor({ groupName, groupId }: {
        groupName: string, groupId: number
    }) {
        this.group_name = groupName;
        this.group_id = groupId;
    }
}