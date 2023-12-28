import React, { useEffect, useState } from "react";
import LayoutWeb from "../../layouts/Web";

function AboutUs() {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		scrollToTop();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<LayoutWeb>
			<div className="bg-[#f9fafb] w-full h-64 my-8 md:h-28 px-12 md:px-24 space-y-5">
				<section className="translate-y-6 flex flex-col gap-y-1">
					<h5 className="text-2xl font-extrabold text-black">About us</h5>
					<p className="text-base font-normal text-[#8888]">
						See what will we do in recent day and future.
					</p>
				</section>
			</div>
			<div className="mt-5 px-12 md:px-24">
				<h5 className="text-2xl font-medium mb-10">
					What's TRAVELING
				</h5>
				<section className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-2 space-y-2 lg:space-y-0">
						<img
							src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
							alt=""
						/>
						<section className="flex flex-col space-y-2">
							<img
								className="lg:h-52"
								src="https://images.unsplash.com/photo-1574169207511-e21a21c8075a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=600&q=60"
								alt=""
							/>
							<img
								src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
								alt=""
							/>
						</section>
					</div>
					<div className="text-base text-gray-500 space-y-3">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, ea?
							Repellendus, laudantium debitis. Debitis expedita hic dignissimos
							libero facilis praesentium odio adipisci, dicta amet eos
							laudantium magnam, voluptates aspernatur porro, reiciendis quidem.
							Veniam blanditiis, nesciunt quos reiciendis mollitia esse est.
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
							adipisci tenetur harum perferendis quam labore! Eaque minima,
							minus aliquam repellat sit recusandae ducimus nemo odit hic
							placeat error, impedit incidunt.
						</p>
					</div>
				</section>
			</div>
		</LayoutWeb>
	);
}

export default AboutUs;
