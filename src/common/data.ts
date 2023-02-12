import FormData from 'form-data';

export class DataUtil {
    static object2FormData(input: any) {
        const formData = new FormData();

        for (const key in input) {
            formData.append(key, input[key]);
        }

        return formData;
    }
}