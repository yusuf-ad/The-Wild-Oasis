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

<!-- rest operator in props -->

function Select({ options, value, ...props }) {
return (
<StyledSelect value={value} {...props}>
{options.map((option) => (

<option key={option.value} value={option.value}>
{option.label}{" "}
</option>
))}
</StyledSelect>
);
}

import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
const [searchParams] = useSearchParams();

const filterValue = searchParams.get("status");

const filter =
!filterValue || filterValue === "all"
? null
: { field: "status", value: filterValue };

const {
isLoading,
data: bookings,
error,
} = useQuery({
// whenever the filter changes react query will refetch the data
queryKey: ["bookings", filter],
// ! this function needs to return a promise
queryFn: () => getBookings({ filter }),
});

return { isLoading, bookings, error };
}

1. Caching is like memoization .

2. if your queryFn depens on a variable , incude it in query key.

3. React Query can refetch data from the cache or the server. By default, React Query will try to fetch data from the cache first. If the data is not in the cache, React Query will then fetch data from the server.

now , when you attempt to refetch without specfying dependency react query thinks running your query function will return same data so lets get you that data from cache , even if you use filter in your query function react query doesnt know that that will change the data fetched by query function .

but when you specify filter as dependency in querykey react query now knows that now running query function will return different result very time filter changes so data wont be fetched from cache and query function will be run .

on page reload and page leave query function is run anyway to detch fresh data ,hence the behaviour we saw here.

<!-- destructuring -->

Hayır, destructuring işlemi orijinal objeyi değiştirmez. Destructuring, orijinal objenin özelliklerini yeni değişkenlere atar, ancak orijinal objeyi olduğu gibi bırakır.

Yani, booking objesinden status, id ve ...booking (geri kalan özellikler) özelliklerini destructuring ile çıkardığınızda, orijinal booking objesi değişmez. status, id (yeni adıyla bookingId) ve booking (id ve status dışındaki özellikler) artık doğrudan kullanılabilir değişkenlerdir.

const {
booking,
booking: { status, id: bookingId } = {},
isLoading,
} = useBooking();

      //   The { active: true } option means that only active queries (queries that are currently being used by at least one component on the screen) will be invalidated.
      queryClient.invalidateQueries({ active: true });

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
const queryClient = useQueryClient();
const navigate = useNavigate();

const { mutate: login, isLoading } = useMutation({
mutationFn: ({ email, password }) => loginAPI({ email, password }),

    onSuccess: () => {
      queryClient.setQueriesData("user", { role: "authenticated" });
      navigate("/dashboard");
    },

    onError: (error) => {
      console.error("ERROR", error);
      toast.error("Provided email or password is incorrect");
    },

});

return { login, isLoading };
}

Örneğin, /login sayfasından /dashboard sayfasına replace: true ile yönlendirme yapılırsa, kullanıcı tarayıcının "geri" düğmesine bastığında /login sayfasına geri dönmez. Çünkü /login URL'si geçmişten silinmiş ve yerine /dashboard eklenmiştir. Bu genellikle kullanıcıların belirli durumlarda (örneğin, başarılı bir giriş işleminden sonra) belirli sayfalara geri dönmesini önlemek için kullanılır.

Using { replace: true } when navigating to the "/login" page after a successful logout is a good practice to enhance security and user experience by preventing users from going back to sensitive or authenticated pages once they have logged out. It effectively "replaces" the current page in the browser's history with the new URL, ensuring that the user's history doesn't retain any information about the previous authenticated state.

querykey array olması lazım

Regarding when to use which one :

Use useQuery when you want to fetch and display data.

Use useMutation when you want to perform mutations that modify data on the server.

<!-- error boundaries -->

error boundaries really only catch errors while React is rendering
