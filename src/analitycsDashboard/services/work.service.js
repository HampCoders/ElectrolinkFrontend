import httpInstance from "../../shared/services/http.instance.js";

export class WorkService {
    resourceEndpoint = import.meta.env.VITE_WORKS_ENDPOINT_PATH;

    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }

    create(work) {
        return httpInstance.post(this.resourceEndpoint, work);
    }
    addImageToWork(workId, imageUrl) {
        return httpInstance.post(
            `${this.resourceEndpoint}/${workId}/image`,
            { imageUrl }
        );
    }
}