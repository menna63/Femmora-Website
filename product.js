document.getElementById('product-image').addEventListener('click', function () {
    this.classList.toggle('zoomed');
});

async function addToCart(id) {
  try {
    const res = await fetch('/Cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Unknown error');
    alert(json.message);         
  } catch (err) {
    alert('Failed to add to cart: ' + err.message);
  }
}

async function addToWishlist(id) {
  try {
    const res = await fetch('/Favorites/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Unknown error');
    alert(json.message);           
  } catch (err) {
    alert('Failed to add to wishlist: ' + err.message);
  }
}

async function addToFavorites(id) {
  try {
    const res = await fetch('/Wishlist/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: id })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Unknown error');
    alert(json.message);           
  } catch (err) {
    alert('Failed to add to favorites: ' + err.message);
  }
}
