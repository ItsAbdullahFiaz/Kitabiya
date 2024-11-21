export const createProductFormData = (productData: any) => {
    const formData = new FormData();

    // Add all text fields
    Object.keys(productData).forEach(key => {
        if (key !== 'images') {
            formData.append(key, productData[key]);
        }
    });

    // Add images
    if (productData.images) {
        productData.images.forEach((image: any) => {
            formData.append('images', {
                uri: image.uri,
                type: 'image/jpeg',
                name: 'image.jpg'
            });
        });
    }

    return formData;
};
