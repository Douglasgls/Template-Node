import Product from "../models/product.js";

export class ProductController{
    hello(req, res){
        res.send("Hello World!");
    }


    async createdProduct(req, res){
        const { name, description, price, imgLink, quantity } = req.body;

        if (!name || !description || !price || !imgLink || !quantity) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if(price <= 0){
            return res.status(400).json({ message: "Price need it is bigger zero" });
        }

        if(quantity <= 0){
            return res.status(400).json({ message: "Quantity need it is bigger zero" });
        }

        const existProduct = await Product.findOne({where: {name: name}})

        if(existProduct){
            return res.status(400).json({ message: "A product with that name already exists" });
        }

       const newProduct = await Product.create(
            {
                name:name,
                description:description,
                price:price,
                quantity:quantity,
                imgLink:imgLink

            }
        )       
        return res.status(200).json({newProduct,message:"created with sucess"})
    }

    async allProduct(req, res){
        const products = await Product.findAll();
        return res.status(200).json({products})
    }

    async findById(req,res){
        const id = req.params.id

        const existProduct = await Product.findByPk(id)

        if(!existProduct){
            res.status(404).json({message:"Product not found"})
        }

        return res.status(200).json({existProduct})
    }

    async updateProduct(req,res){
        const validKeys = ['name','price','description','qualitity','imgLink']
        const id = req.params.id
        const existProduct = await Product.findByPk(id)

        const body = req.body;

        for(const [key] of Object.entries(req.body)){
            if(!validKeys.includes(key)){
                res.status(400).json({message:"key invalid: " + key, validKeys: validKeys})
            }
        }

        if(!body){
            res.status(400).json({message:"You must provide at least one value"})
        }

        if(!existProduct){
            res.status(404).json({message:"Product not found"})
        }

        const product = existProduct.get({plain:true})

        for(const [key, value] of Object.entries(req.body)){
           if(product[key] != value){
            product[key] = value
           }
        }

        product.updatedAt = Date.now()

        await Product.update(product,{
            where:{id:id}
        })

        return res.status(200).json({
            product
        })
    }

    async deleteProduct(req,res){
        const id = req.params.id
        const existProduct = await Product.findByPk(id)

        if(!existProduct){
            res.status(404).json({message:"Product not found"})
        }

        await Product.destroy({
            where:{id:id}
        })

        return res.status(200).json({
            message:"Destroy sucess"
        })

    }

}