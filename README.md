# e-online-shop

# Introduction 
e-Online-Shop is a modern online shop built using Angular with standalone components and NgRx for state management. The project features a product catalog, shopping cart, and user authentication system, focusing on accessibility and clean design.

 
# Getting Started
Table of Contents:


1.	Features
2.	Technologies Used
3.	Installation
4.	Usage  Authentication / Products /Cart
5.	Components Overview
6.	State Management
7.  Future Improvements

# Features


- **User Authentication** : Login and registration functionality with session management using localStorage.
- **Product Catalog** : Display of products with detailed information including title, author, category, rating, and description.
- **Shopping Cart** : Add, view, and remove items from the cart with real-time updates.
- **NgRx State Management** : Store management for products and cart, making use of NgRx effects.
- **Responsive Design** : Designed for mobile and desktop views using CSS grid and flexbox.
- **Accessibility** : Focus on making the project accessible with proper keyboard navigation and ARIA practices.


# Technologies Used
- Angular (Standalone components)
- NgRx (State management)
- Angular Material (UI components and accessibility)
- Ionic Framework (Mobile compatibility)
- CSS/SCSS (Styling)
- RxJS (Handling async data and observables)


# Build and Test
TODO: Describe and show how to build your code and run the tests.
1. Clone the repository:
   -     git clone https://github.com/eljona406/e-online-shop/.git

   
2. Install dependencies:
   -     cd e-online-shop
   -     npm install

  
3.Run the project:
   -     ng serve



# Usage
- **Authentication**
Login and Registration forms are available as standalone components. Authentication data is stored in localStorage.
You can log in with a test account:


      Email: test@example.com
      Password: password123


- **Products**
Products are displayed in a list view on the /products page. Each product includes details such as the title, category, rating, and price.
Clicking on a product opens its details page, where a user can view more detailed information, add it to the cart, and see similar items.


- **Cart**
The cart is managed with NgRx. You can add products from the product details page, view the cart, and proceed to checkout.


# State Management
NgRx is used for handling state across the application. The key store slices include:

- Products: Contains the product list fetched from the backend (or mocked data).
    - Selectors: selectProducts
- Cart: Stores the items added to the cart and allows for quantity updates and item removal.
    - Actions: addToCart, removeFromCart
    - Selectors: selectCartItems, selectCartTotal
- Effects are used to fetch products asynchronously from the store.






If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)
