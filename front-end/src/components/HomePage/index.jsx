import { useEffect, useState }from 'react';
import ManageProductModal from '../ManageProductModal';
import ProductList from '../ProductList';
import EmptyIndicator from '../EmptyIndicator';
import {
  Box,
  Button,
  useDisclosure,
  Heading,
} from '@chakra-ui/react';

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [productToEdit, setDataEdit] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products/');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
      throw new Error('Erro ao carregar os produtos.');
    }
  };
  return (
    <>
      <Box maxW={800} w='100%' h='100vh' py={10} px={2}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading> Produtos </Heading>
        <Button colorScheme='blue' onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO PRODUTO
        </Button>
      </Box>

      {products.length > 0 &&
        <ProductList
          setProducts={setProducts}
          products={products}
          onOpen={onOpen}
          setDataEdit={setDataEdit}
        />
      }

      {products.length == 0 &&
        <EmptyIndicator
          element='produto'
        />
      }

      </Box>
      {isOpen && (
        <ManageProductModal
          isOpen={isOpen}
          onClose={onClose}
          setProducts={setProducts}
          productToEdit={productToEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </>
  );
};

export default HomePage;