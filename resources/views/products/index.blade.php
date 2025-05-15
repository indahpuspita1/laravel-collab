<!DOCTYPE html>
<html lang="en">
<head>
    <title> List of Products </title>
</head>
<body>
    <h1> List of Products </h1>
    <a href="{{ url('/products/create') }}">➕ Add Product</a>
    @if(session('success'))
    <p style="color: green;">{{ session('success') }}</p>
@endif
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
        </tr>
        @foreach ($products as $product)
        <tr>
            <td>{{ $product->id }}</td>
            <td>{{ $product->name }}</td>
            <td>${{ $product->price }}</td>
            <td>{{ $product->stock }}</td>
            <td>
                <a href="{{ url('/products', $product->id) }}">View</a>
            </td>
            <td>
          <a href="{{ url('/products/'.$product->id.'/edit') }}">Edit</a> 
     </td>
     <td>
    <form action="{{ url('/products', $product->id) }}" method="POST" style="display:inline;">
    @csrf
    @method('DELETE')
    <button type="submit" onclick="return confirm('Are you sure?')">Delete</button>
    </form>
    </td>

        </tr>
        @endforeach
    </table>
</body>
</html>



