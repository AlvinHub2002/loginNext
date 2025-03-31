import axios from "./axios";

export async function fileUpload(data: any) {
    const arr = [];

    const formData = new FormData();

    if (data !== undefined || data !== "") {
        formData.append("file", data);
        // const configUpload = {
        //     url: "/api/v1/forms/file",
        //     method: 'post',
        //     data: formData,
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //     },
        //     withCredentials: true,
        //     onUploadProgress: function (progessEvent: any) {
        //         const percent = (progessEvent.loaded / progessEvent.total) * 100;
        //         console.log(percent);
        //     },
        // }
        const response = await axios.post("/api/v1/forms/file", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
        )


        arr.push({ ...response.data })
    }

    return arr;
}