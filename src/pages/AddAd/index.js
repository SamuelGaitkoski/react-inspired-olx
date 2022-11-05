import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { PageArea } from './styled';
import useAPI from '../../helpers/OlxAPI';
import { PageContainer, PageTitle, ErrorMessage } from "../../components/MainComponents";

// Vamos ter muitos campos, mas o ponto chave é que vamos enviar arquivos, vamos enviar as imagens do anúncio também.
const Page = () => {
    const api = useAPI();
    // definimos no campo com type file uma ref, que é uma referencia que vamos usar para manipular esse campo, então vamos criar essa variavel fileField que setamos como referencia para o campo, setando nela a chamada do hook useRef do react, então vamos importar esse hook do React também.
    const fileField = useRef();
    // vamos usar o hook useNavigate aqui
    const navigate = useNavigate();

    // states
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    // state para ver se o preço é negociável ou não
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    // descrição
    const [desc, setDesc] = useState('');
    // vamos manter o disabled e o error
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const [categories, setCategories] = useState([]);

    // Usando esse useEffect para que quando a tela for renderizada as categorias sejam buscadas e setadas para a state categories, que é uma lista de categorias, para exibirmos as mesmas no select das categorias.
    // o category é a categoria escolhida, e o categories é a lista de categorias que podemos selecionar.
    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            // manda a lista de categorias para a state categories.
            setCategories(cats);
        }
        // chamando a função getCategories() para ele fazer a requisição e pegar nossa lista de categorias
        getCategories();
    }, []);

    // vamos lidar agora com o envio dos dados do formulário, que ocorrerá quando todos os campos do formulário forem preenchidos. 
    // Nessa página, não vamos enviar só os dados, mas também vamos enviar os arquivos, que são as imagens que o usuário está mandando, nesse caso vamos precisar fazer algumas verificações antes, pois nessa página podem ocorrer vários erros. Para publicar um anúncio tem que ser enviado o título e a categoria. 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        // Já colocamos o preventDefault, o setDisabled, limpamos os erros
        // Agora vamos criar uma variável chamada errors, que vai ser um array, vamos preencher ela com um ou mais itens, e depois se houver algum erro, vamos exibir todos os erros que ocorreram em um mesmo momento
        let errors = [];

        // vamos verificar se o usuário digitou um título, além do required
        // vamos dar um title.trim(), pois se for digitado um espaço conta como digitado/caractere, o trim tira esses espaços, logo, se não tiver titulo depois do trim, vamos mandar um erro para o array errors.
        if(!title.trim()) {
            errors.push('Sem título');
        }

        // se não tiver uma categoria selecionada, vamos mandar outro erro para o array errors
        if(!category) {
            errors.push('Sem categoria');
        }

        // Agora que verificamos algumas informações, vamos ver se teve algum erro dentro de errors. Se errors.length for igual a 0, continuamos, pois não teve nenhum erro.
        if(errors.length === 0) {
            // agora continuamos, pois não deu nenhum erro, dai vamos para o envio dos dados. 
            // Quando estamos enviando dados e arquivos ao mesmo tempo, o ideal é que utilizemos o formData, então vamos criar o fData, que vai ser um new FormData(), dai no fData adicionamos os itens que vamos enviar, então damos append() para colocar itens dentro do fData, passando no append o item que queremos colocar dentro do fData.
            const fData = new FormData();
            // o item title passado para o fData vai ter seu valor definido pelo title (state), etc, damos um nome para o item que estamos enviando, e botamos o valor que vamos enviar para aquele item também.
            fData.append('title', title);
            fData.append('price', price);
            // é priceneg o nome do campo que enviamos
            fData.append('priceneg', priceNegotiable);
            // desc é a descrição
            fData.append('desc', desc);
            // cat é a categoria que enviamos
            fData.append('cat', category);
            // essas são as informações principais
            // Agora vamos enviar as imagens, vamos adicionar as imagens no formulário que estamos criando também, primeiro vamos verificar se tem alguma imagem. Se o fileField.current.files.length for maior que 0, se tiver arquivos enviados, vamos dar um loop pela quantidade de arquivos enviados, vamos percorrer esses arquivos, e vamos adicionar cada um dos arquivos no formulario, cada item com nome img no fData. Se foi adicionado algum outro tipo de arquivoa além de imagem, como um arquivo zip por exemplo, não tem problema, pois o próprio web service (api) vai fazer a verificação e vai retornar que o arquivo não é suportado, então não nos preocupamos com isso.
            if (fileField.current.files.length > 0) {
                for (let i = 0; fileField.current.files.length; i++) {
                    fData.append('img', fileField.current.files[i]);
                }
            }
            
            // Agora que adicionamos todos os arquivos, temos que fazer nossa requisição.
            // mandamos nosso fData para o método addAd que vai fazer a requisição POST para a api
            const json = await api.addAd(fData);

            // se não deu nenhum erro de requisição
            if (!json.error) {
                // Agora vamos usar o histórico do próprio router, vamos importar o hook useHistory do react-router-dom.
                // Vamos usar nosso history que chamou o hook useHistory aqui, para fazer redirecionamento dentro do próprio router, nesse caso não precisamos atualizar a página.
                // vamos mandar para o /ad/id do json que ele vai nos retornar, logo, se não tiver erro, ele vai retornar aqui o id do anúncio, dai mandamos ele para o próprio anúncio.
                //navigate.push(`/ad/${json.id}`);
                navigate(`/ad/${json.id}`);

                // return para ele parar aqui mesmo
                return;
            } else {
                // se der algum erro, mostramos o erro, setando o erro na state error
                setError(json.error);
            }
        } else {
            // Caso contrário exibimos os erros, dando um join no setError, dizendo para ele juntar os itens do array e pular a linha, para exibir cada um embaixo do outro, cada erro em uma linha. a state error tem os erros que serão exibidos, dai adicionamos os erros para a state pelo setError.
            setError(errors.join("\n"));
        }

        // no fim damos um setDisabled false, se deu erro ou não, dai ele habilita todos os campos novamente.
        setDisabled(false);
    }

    // propriedade multiple aplicada em input com type file permite que enviemos mais de um arquivo/imagem dentro do campo
    // em ref botamos uma referencia para podermos manipular esse campo, então vamos criar uma variavel fileField.
    // Agora temos que preencher as informações, receber as categorias para exibir no select e o campo do preço no qual usaremos um componente com máscara para colocarmos o preço.

    // no select de Categoria, vamos botar o onChange, que vai mudar a categoria escolhida, que é o category, então para mudar o category usamos o setCategory. Dai vamos botar uma option vazia, seguida das options que vão vir da lista de categorias, categories. Se categories existir, ele vai dar um map nessa lista, criando um option para cada categoria/item, dai no key e no value do option vai ser o proprio id da categoria e cada option vai exibir o nome da categoria. Agora temos nossas categorias todas estando disponíveis no select da categoria.
    // Para o campo do preço, vamos precisar de um componente e um complemento desse componente. Vamos dar um npm install react-text-mask text-mask-addons - onde o react-text-mask é o componente e o text-mask-addons é um complemento do react-text-mask. Dai vamos importar o MaskedInput da biblioteca react-text-mask e importar o createNumberMask da biblioteca text-mask-addons/dist/createNumberMask, vamos precisar desses 2 componentes agora. Agora vamos criar um objeto que vai definir propriedades da nossa máscara, dai chamamos o createNumberMask passando um objeto para ele com algumas propriedades, o prefixo vai ser o símbolo do real (R$) com um espaço, dai vamos botar ele incluir o separador de milhares (includeThousandsSeparator), dai vamos dizer qual é o símbolo desse separador, que é um . dai vamos permitir os decimais (allowDecimal), e vamos colocar o símbolo dos decimais, que é a vírgula (,), estamos botando aqui os padrões brasileiros.
    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','
    });
    // Agora vamos no campo de preço e vamos criar o nosso componente, usando o nosso componente MaskedInput, passando para ele a prop mask, que é a máscara dele, que é a máscara que acabamos de criar, a priceMask, dai vamos botar o placeholder, que vai ser um 'R$ '. O disabled vai se comportar em duas situações, quando o disabled estiver true, ou o preço vai ficar desativado também quando o priceNegotiable estiver true/marcada, dai o preço é automaticamente desabilitado. O value é o price e o onChange botamos normal. Dessa forma ele coloca o prefixo do preço, que é real, e coloca a pontuação de decimal ou milhar.
    // Agora todos os campos estão funcionando corretamente.

    return(
        <PageContainer>
            <PageTitle>Postar um anúncio</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
        
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Título</div>
                        <div className="area--input">
                            <input 
                                type="text" disabled={disabled}
                                value={title} 
                                onChange={e=>setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Categoria</div>
                        <div className="area--input">
                            <select
                                disabled={disabled}
                                onChange={e => setCategory(e.target.value)}
                                required
                            >
                                <option></option>
                                {categories && categories.map(item => 
                                    <option key={item._id} value={item._id}>{item.name}</option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Preço</div>
                        <div className="area--input">
                            <MaskedInput 
                                mask={priceMask}
                                placeholder="R$ "
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Preço Negociável</div>
                        <div className="area--input">
                            <input 
                                type="checkbox"
                                disabled={disabled}
                                checked={priceNegotiable}
                                onChange={e => setPriceNegotiable(!priceNegotiable)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Descrição</div>
                        <div className="area--input">
                            <textarea>
                                disabled={disabled}
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                            </textarea>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Imagens (1 ou mais)</div>
                        <div className="area--input">
                            <input 
                                type="file"
                                disabled={disabled}
                                ref={fileField}
                                multiple
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Adicionar Anúncio</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Page;