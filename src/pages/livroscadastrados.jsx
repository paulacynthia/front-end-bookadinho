import { Book } from "../components/Books";
import { useEffect, useState } from "react";
import { Layout } from "../layout/Bookadinho/Layout";
import { home } from "../utils/routes/routes";
import { SimpleGrid } from "@chakra-ui/react";

export default function LivrosCadastrados() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const locaStorage = window.localStorage.getItem('profile')
        const user = JSON.parse(locaStorage)
        const getBooksProfile = async () => {
            const {result: allBooks} = await home()
            setBooks(allBooks.filter((book) => book.profile.id === user.id))
        }
        getBooksProfile()
    }, [])

    return (
        <Layout title="Livros Cadastrados" titleTag={"Livros Cadastrados"}>
            <SimpleGrid columns={2} spacing={10}>
                {
                    books.map((book) => (
                        <Book
                            key={book.id}
                            id={book.id}
                            title={book.name}
                            author={book.author}
                            image={book.photo}
                            imageDescription={`Livro ${book.name}`}
                            description={book.description}
                        />
                    ))
                }
            </SimpleGrid>
        </Layout>
    )
}