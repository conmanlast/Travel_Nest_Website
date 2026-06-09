
function showNotification(message, type = 'success') {
    
    const notification = document.createElement('div');
    notification.innerText = message;
    
    
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '10px';
    notification.style.color = 'white';
    notification.style.zIndex = '9999';
    notification.style.fontSize = '1rem';
    notification.style.fontWeight = 'bold';
    notification.style.transition = 'opacity 0.5s ease';
    
    
    notification.style.backgroundColor = type === 'success' ? '#2a9d8f' : '#e76f51';

    document.body.appendChild(notification);

    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}