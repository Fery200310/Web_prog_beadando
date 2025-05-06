function validateProductForm(event) {
    event.preventDefault();
    
    // Reset all error messages
    clearErrors();
    
    // Get form values
    const productName = document.getElementById('productName').value.trim();
    const productCategory = document.getElementById('productCategory').value;
    const productPrice = document.getElementById('productPrice').value;
    const productStock = document.getElementById('productStock').value;
    const productDescription = document.getElementById('productDescription').value.trim();
    const productImage = document.getElementById('productImage').value.trim();
    
    let isValid = true;
    
    // Validate product name (minimum 3 characters)
    if (productName.length < 3) {
        showError('productNameError', 'A termék neve legalább 3 karakterből kell álljon!');
        isValid = false;
    }
    
    // Validate category
    if (!productCategory) {
        showError('productCategoryError', 'Kérjük, válasszon kategóriát!');
        isValid = false;
    }
    
    // Validate price (must be positive number)
    if (isNaN(productPrice) || productPrice <= 0) {
        showError('productPriceError', 'Az árnak pozitív számnak kell lennie!');
        isValid = false;
    }
    
    // Validate stock (must be non-negative integer)
    if (isNaN(productStock) || productStock < 0 || !Number.isInteger(Number(productStock))) {
        showError('productStockError', 'A készletnek nem negatív egész számnak kell lennie!');
        isValid = false;
    }
    
    // Validate description (minimum 10 characters)
    if (productDescription.length < 10) {
        showError('productDescriptionError', 'A leírásnak legalább 10 karakterből kell állnia!');
        isValid = false;
    }
    
    // Validate image URL
    if (!isValidImageUrl(productImage)) {
        showError('productImageError', 'Kérjük, adjon meg érvényes kép URL-t!');
        isValid = false;
    }
    
    if (isValid) {
        // Get existing products or initialize empty array
        const products = JSON.parse(localStorage.getItem('products')) || [];
        
        // Create new product object
        const newProduct = {
            id: Date.now(), // Unique ID based on timestamp
            name: productName,
            category: productCategory,
            price: Number(productPrice),
            stock: Number(productStock),
            description: productDescription,
            image: productImage
        };
        
        // Add new product to array
        products.push(newProduct);
        
        // Save updated products array
        localStorage.setItem('products', JSON.stringify(products));
        
        // Show success message
        const formResult = document.getElementById('formResult');
        formResult.innerHTML = '<div class="alert alert-success">A termék sikeresen hozzáadva!</div>';
        
        // Clear form
        document.getElementById('productForm').reset();
    }
    
    return false;
}

function isValidImageUrl(url) {
    try {
        new URL(url);
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    } catch {
        return false;
    }
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
}

function clearErrors() {
    const errorElements = document.getElementsByClassName('error-message');
    for (let element of errorElements) {
        element.textContent = '';
    }
    document.getElementById('formResult').innerHTML = '';
} 