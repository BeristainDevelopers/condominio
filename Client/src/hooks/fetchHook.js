export const fetchHook = async (url, method = "GET", body = null, token = null) => {
    const headers = {};

    const isFormData = body instanceof FormData;

    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = isFormData ? body : JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);

        if (response.status === 204) return {};

        const contentType = response.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
            return await response.json();
        }

        return { data: await response.text() };
    } catch (error) {
        console.error("Error en la petición:", error);
        return { error: "Error en la conexión" };
    }
};
