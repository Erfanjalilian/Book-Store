"use client";
import Sidebar from "@/app/ComponentsUserPanel/Sidebar/Sidebar";
import { useAuth } from "@/app/Contexts/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";

type Favorite = {
  id: number;
  userId: number;
  productId: number;
  title: string;
  image: string;
  price: number;
};

function Favorites() {
  const { user, logout } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const myId = user?.id;

  useEffect(() => {
    if (!myId) return;

    fetch(`http://localhost:3000/favorites?userId=${myId}`)
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((error) => {
        console.error("Error fetching favorite data:", error);
      });
  }, [myId]);

 

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r p-4">
        <Sidebar />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">لیست علاقه‌مندی‌ها</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            favorites.length===0?
            <p className="text-gray-500">فعلاً هیچ چیزی را به علاقه‌مندی‌ها اضافه نکرده‌اید.</p>
            :
            favorites.map((fav) => (
              <div 
                key={fav.id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center"
              >
                  <Link href={`/CategoriesPage/${fav.productId}`}>
                          <img
                          src={fav.image}
                          alt={fav.title}
                          className="w-40 h-40 object-cover rounded-lg mb-4"
                      />
                      <h2 className="text-lg font-semibold mb-2">{fav.title}</h2>
                      <p className="text-green-600 font-bold">
                          {fav.price.toLocaleString()} تومان
                      </p>
                </Link>
               
              </div>
            ))
          }
         
        </div>
      </div>
    </div>
  );
}

export default Favorites;
