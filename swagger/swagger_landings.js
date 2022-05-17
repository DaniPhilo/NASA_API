/**
 * @swagger
 * components:
 *   schemas:
 *     Landing:
 *       type: object
 *       required:
 *         - name
 *         - id
 *         - recclass
 *         - mass
 *         - year
 *         - reclat
 *         - reclong
 *       properties:
 *         name: 
 *           type: string
 *           description: The name of the landing
 *         id:
 *           type: string
 *           description: The ID of the landing
 *         nametype:
 *           type: string
 *           description: I don't really know what this stands for
 *         recclass:
 *           type: string
 *           description: The class of the landing
 *         mass:
 *           type: string
 *           description: The weight of the landing in Kg
 *         fall:
 *           type: string
 *           description: I don't really know what this stands for
 *         year:
 *           type: string
 *           description: The date of the landing
 *         reclat:
 *           type: string
 *           description: The latitude of the landing
 *         reclong:
 *           type: string
 *           description: The longitude of the landing
 *         geolocation:
 *           type: object
 *           properties:
 *             latitude:
 *               type: string
 *             longitude:
 *               type: string
 *           description: An object with both latitude and longitude of the landing location
 */

/**
 * @swagger
 * tags:
 *   name: Landings
 *   description: The landings managing API
 */

/**
 * @swagger
 * /landings/{page}:
 *   get:
 *     summary: Returns a list with all landings, or paginated by 10 if page number specified
 *     tags: [Landings]
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: string
 *         required: false
 *         description: Number of page
 *     responses:
 *       200:
 *         description: A list of all landings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Landing'
 */

/**
 * @swagger
 * /landings/name/{name}:
 *   get:
 *     summary: Gets landings whose names match total or partially the {name} parameter
 *     tags: [Landings]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Letters that will match the landing's name
 *     responses:
 *       200:
 *         description: A list of matchin landings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Landing'
 *       400:
 *         description: No matching landings found
 */

/**
 * @swagger
 * /landings/minMass/{minMass}:
 *   get:
 *     summary: Gets landings whose mass is equal or greater than {minMass} parameter
 *     tags: [Landings]
 *     parameters:
 *       - in: path
 *         name: minMass
 *         schema:
 *           type: integer
 *         required: true
 *         description: Landing's mass
 *     responses:
 *       200:
 *         description: A list of matching landings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Landing'
 *       400:
 *         description: No matching landings found
 */

/**
 * @swagger
 * /landings/mass/{queryMass}:
 *   get:
 *     summary: Gets landings whose mass is equal to {mass} query parameter
 *     tags: [Landings]
 *     parameters:
 *       - in: path
 *         name: queryMass
 *         schema:
 *           type: integer
 *         required: true
 *         description: Landing's mass
 *     responses:
 *       200:
 *         description: A list of matching landings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Landing'
 *       400:
 *         description: No matching landings found
 */

/**
 * @swagger
 * /landings/class/{queryClass}:
 *   get:
 *     summary: Gets landings whose class match {queryClass} parameter
 *     tags: [Landings]
 *     parameters:
 *       - in: path
 *         name: queryClass
 *         schema:
 *           type: string
 *         required: true
 *         description: Landing's class
 *     responses:
 *       200:
 *         description: A list of matching landings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Landing'
 *       400:
 *         description: No matching landings found
 */

/**
 * @swagger
 * /landings/date:
 *   get:
 *     summary: Gets landings whose date matches query {from} and / or {to} parameters
 *     tags: [Landings]
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *         required: false
 *         description: Landing's minimum date
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *         required: false
 *         description: Landing's maximum date
 *     responses:
 *       200:
 *         description: A list of matching landings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Landing'
 *       400:
 *         description: No matching landings found
 */

/**
 * @swagger
 * /landings/create:
 *   post:
 *     summary: Creates a new landing
 *     tags: [Landings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Landing'
 *     responses:
 *       201:
 *         description: The landing was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Landing'
 *       400:
 *         description: Unable to create due to invalid landing fields
 */

/**
 * @swagger
 * /landings/edit/{id}:
 *   put:
 *     summary: Finds landing by ID and updates it
 *     tags: [Landings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The landing's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Landing'
 *     responses:
 *       200:
 *         description: The landing was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Landing'
 *       400:
 *         description: No matching landings found
 */

/**
 * @swagger
 * /landings/delete/{id}:
 *   delete:
 *     summary: Finds landing by ID and deletes it
 *     tags: [Landings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The landing's ID
 *     responses:
 *       200:
 *         description: The landing was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Landing'
 *       400:
 *         description: No matching landings found
 */