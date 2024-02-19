# The Wil Oasis Notes

I don't know if after will change it, but it's a bad practice to use styled components inside the file component. Need to be in their own files, better organization, to locate and update and most important for the scalability. And personally I always add .style.jsx to be help the maintainability.

### css helper function generate CSS from a template literal with interpolations.

So the way we do mutations is not by doing "useQuery," but "useMutation."

each query should be uniquely identified

So essentially, whenever you can't directly pass

in JSX with the children prop

because you need to give the component a description

on how to render something,

then you need to reach for this render props pattern.

import { useState } from "react";

export default function withToggles(WrappedComponent) {
return function List(props) {
const [isOpen, setIsOpen] = useState(true);
const [isCollapsed, setIsCollapsed] = useState(false);

    const displayItems = isCollapsed ? props.items.slice(0, 3) : props.items;

    function toggleOpen() {
      setIsOpen((isOpen) => !isOpen);
      setIsCollapsed(false);
    }

    return (
      <div className="list-container">
        <div className="heading">
          <h2>{props.title}</h2>
          <button onClick={toggleOpen}>
            {isOpen ? <span>&or;</span> : <span>&and;</span>}
          </button>
        </div>
        {isOpen && <WrappedComponent {...props} items={displayItems} />}

        <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
          {isCollapsed ? `Show all ${props.items.length}` : "Show less"}
        </button>
      </div>
    );

};
}

## compound component pattern

1. create a context

2. create parent component

3. create child components to help implementing common task

4. add child components as properties to the parent component

### React portal

So in other words, with a portal we can basically render a component
in any place that we want inside the DOM tree but still leave the component
at the same place in the React component tree.

// we use react portal for reusability
function Modal({ children, onClose }) {
return createPortal(
<Overlay>
<StyledModal>
<Button onClick={onClose}>
<HiXMark />
</Button>

        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body

);
}

## useClickOutside hook

# mousedown ve click eventinin farkları

Tetiklenme Zamanı: mousedown tıklama işlemi başladığında hemen tetiklenirken, click tıklama işleminin tamamlanmasından (basma ve bırakma) sonra tetiklenir.
Kullanım Amacı: mousedown daha çok anında tepki verilmesi gereken durumlar için uygunken, click daha çok standart tıklama işlemleri için kullanılır.

# createPortal()

React'te createPortal() metodunun temel amacı, bir çocuk bileşenini DOM'un başka bir yerinde render etmeyi sağlamaktır. Bu genellikle modaller, pop-up'lar veya tooltip'ler gibi, uygulamanın ana DOM hiyerarşisinden bağımsız olarak yönetilmesi gereken UI parçaları için kullanılır.

# getBoundingClientRect()

getBoundingClientRect() metodu, bir HTML elementinin konumu ve boyutu hakkında bilgi veren bir JavaScript API'sidir. Bu metod, elementin görüntü alanındaki (viewport) mutlak pozisyonunu, yani sol, üst, sağ, alt, genişlik (width) ve yükseklik (height) değerlerini içeren bir DOMRect nesnesi döndürür. Bu bilgiler, sayfa üzerindeki öğelerin yerleşimini anlamak, animasyonlar oluşturmak, sürükle-bırak işlemleri gerçekleştirmek ve daha birçok durumda kullanılabilir.
