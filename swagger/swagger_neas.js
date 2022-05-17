/**
 * @swagger
 * components:
 *   schemas:
 *     NEA:
 *       type: object
 *       required:
 *         - designation
 *         - discovery_date
 *         - h_mag
 *         - moid_au
 *         - q_au_1
 *         - q_au_2
 *         - period_yr
 *         - i_deg
 *         - pha
 *         - orbit_class
 *       properties:
 *         designation: 
 *           type: string
 *           description: The designation of the NEA
 *         discovery_date:
 *           type: string
 *           description: Discovery date of the NEA
 *         h_mag:
 *           type: string
 *           description: Discovery date of the NEA
 *         moid_au:
 *           type: string
 *           description: Discovery date of the NEA
 *         q_au_1:
 *           type: string
 *           description: Discovery date of the NEA
 *         q_au_2:
 *           type: string
 *           description: Discovery date of the NEA
 *         period_yr:
 *           type: string
 *           description: Discovery date of the NEA
 *         i_deg:
 *           type: string
 *           description: Discovery date of the NEA
 *         pha:
 *           type: string
 *           description: Discovery date of the NEA
 *         orbit_class:
 *           type: string
 *           description: I don't really know what this stands for
 */

/**
 * @swagger
 * tags:
 *   name: NEAs
 *   description: The NEAs managing API
 */

/**
 * @swagger
 * /neas/{page}:
 *   get:
 *     summary: Returns a list with all NEAs, or paginated by 10 if page number specified
 *     tags: [NEAs]
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: int
 *         required: false
 *         description: Number of page
 *     responses:
 *       200:
 *         description: A list of all NEAs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NEA'
 */

/**
 * @swagger
 * /neas/designation/{designation}:
 *   get:
 *     summary: Gets NEAs whose designations match total or partially the {designation} parameter
 *     tags: [NEAs]
 *     parameters:
 *       - in: path
 *         name: designation
 *         schema:
 *           type: string
 *         required: true
 *         description: Letters that will match the NEA's designation
 *     responses:
 *       200:
 *         description: A list of matchin NEAs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NEA'
 *       400:
 *         description: No matching NEAs found
 */

/**
 * @swagger
 * /neas/class/{queryClass}:
 *   get:
 *     summary: Gets NEAs whose orbit_class matches {queryClass} parameter
 *     tags: [NEAs]
 *     parameters:
 *       - in: path
 *         name: queryClass
 *         schema:
 *           type: string
 *         required: true
 *         description: NEA's mass
 *     responses:
 *       200:
 *         description: A list of matching NEAs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NEA'
 *       400:
 *         description: No matching NEAs found
 */

/**
 * @swagger
 * /neas/date:
 *   get:
 *     summary: Gets NEAs whose date matches query {from} and / or {to} parameters
 *     tags: [NEAs]
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *         required: false
 *         description: NEA's minimum date
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *         required: false
 *         description: NEA's maximum date
 *     responses:
 *       200:
 *         description: A list of matching NEAs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NEA'
 *       400:
 *         description: No matching NEAs found
 */

/**
 * @swagger
 * /neas/create:
 *   post:
 *     summary: Creates a new NEA
 *     tags: [NEAs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NEA'
 *     responses:
 *       201:
 *         description: The NEA was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NEA'
 *       400:
 *         description: Unable to create due to invalid NEA fields
 */

/**
 * @swagger
 * /neas/edit/{designation}:
 *   put:
 *     summary: Finds NEA by designation and updates it
 *     tags: [NEAs]
 *     parameters:
 *       - in: path
 *         name: designation
 *         schema:
 *           type: string
 *         required: true
 *         description: The NEA's designation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NEA'
 *     responses:
 *       200:
 *         description: The NEA was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NEA'
 *       400:
 *         description: No matching NEAs found
 */

/**
 * @swagger
 * /neas/delete/{designation}:
 *   delete:
 *     summary: Finds NEA by designation and deletes it
 *     tags: [NEAs]
 *     parameters:
 *       - in: path
 *         name: designation
 *         schema:
 *           type: string
 *         required: true
 *         description: The NEA's designation
 *     responses:
 *       200:
 *         description: The NEA was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NEA'
 *       400:
 *         description: No matching NEAs found
 */