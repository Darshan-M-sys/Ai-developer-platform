class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.is_available = True

    def __str__(self):
        status = "Available" if self.is_available else "Borrowed"
        return f"'{self.title}' by {self.author} (ISBN: {self.isbn}) - [{status}]"

class Library:
    def __init__(self):
        self.books = []

    def add_book(self, book):
        self.books.append(book)
        print(f"Added: {book.title}")

    def display_books(self):
        print("\n--- Library Inventory ---")
        if not self.books:
            print("The library is empty.")
        for book in self.books:
            print(book)

    def borrow_book(self, title):
        for book in self.books:
            if book.title.lower() == title.lower():
                if book.is_available:
                    book.is_available = False
                    print(f"You have successfully borrowed '{book.title}'.")
                    return
                else:
                    print(f"Sorry, '{book.title}' is already borrowed.")
                    return
        print(f"Book titled '{title}' not found.")

    def return_book(self, title):
        for book in self.books:
            if book.title.lower() == title.lower():
                book.is_available = True
                print(f"Thank you for returning '{book.title}'.")
                return
        print(f"Error: '{title}' does not belong to this library.")

def main():
    my_library = Library()
    
    # Pre-loading some books
    my_library.add_book(Book("The Great Gatsby", "F. Scott Fitzgerald", "12345"))
    my_library.add_book(Book("1984", "George Orwell", "67890"))
    my_library.add_book(Book("The Hobbit", "J.R.R. Tolkien", "11223"))

    while True:
        print("\n1. View Books\n2. Borrow a Book\n3. Return a Book\n4. Exit")
        choice = input("Select an option (1-4): ")

        if choice == '1':
            my_library.display_books()
        elif choice == '2':
            title = input("Enter the title to borrow: ")
            my_library.borrow_book(title)
        elif choice == '3':
            title = input("Enter the title to return: ")
            my_library.return_book(title)
        elif choice == '4':
            print("Goodbye!")
            break
        else:
            print("Invalid choice, try again.")

if __name__ == "__main__":
    main()
