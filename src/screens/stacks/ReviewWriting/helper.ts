import { ReviewPayload } from "@/types";

export function toFormData(payload: ReviewPayload): FormData {
    const formData = new FormData();
    formData.append("orderItem", payload.orderItem);
    formData.append("rating", String(payload.rating));
    formData.append("content", payload.content);

    if (payload.images && payload.images.length > 0) {
        payload.images.forEach((uri, index) => {
            const fileName = uri.split("/").pop() ?? `review_${index + 1}.jpg`;
            const match = /\.(\w+)$/.exec(fileName);
            const ext = match?.[1]?.toLowerCase() ?? "jpg";
            const mime = `image/${ext === "jpg" ? "jpeg" : ext}`;

            formData.append("images", {
                uri,
                name: fileName,
                type: mime,
            } as any);
        });
    }

    return formData;
}
