- [User's guide](#users-guide)
  - [Interface of the annotation tool](#interface-of-the-annotation-tool)
    - [Basic navigation](#basic-navigation)
    - [Types of shapes (basics)](#types-of-shapes-basics)
    - [Shape mode (basics)](#shape-mode-basics)
    - [Track mode (basics)](#track-mode-basics)
    - [Attribute annotation mode (basics)](#attribute-annotation-mode-basics)
    - [Downloading annotations](#downloading-annotations)
    - [Task synchronization with a repository](#task-synchronization-with-a-repository)
    - [Vocabulary](#vocabulary)
    - [Workspace](#workspace)
    - [Settings](#settings)
    - [Top Panel](#top-panel)
    - [Controls sidebar](#controls-sidebar)
    - [Objects sidebar](#objects-sidebar)
      - [Objects](#objects)
      - [Labels](#labels)
  - [Shape mode (advanced)](#shape-mode-advanced)
  - [Track mode (advanced)](#track-mode-advanced)
  - [Attribute annotation mode (advanced)](#attribute-annotation-mode-advanced)
  - [Annotation with rectangle by 4 points](#annotation-with-rectangle-by-4-points)
  - [Annotation with polygons](#annotation-with-polygons)
  - [Annotation with polylines](#annotation-with-polylines)
  - [Annotation with points](#annotation-with-points)
    - [Points in shape mode](#points-in-shape-mode)
    - [Linear interpolation with one point](#linear-interpolation-with-one-point)
  - [Annotation with cuboids](#annotation-with-cuboids)
  - [Annotation with tags](#annotation-with-tags)
  - [Automatic annotation](#automatic-annotation)
  - [Shape grouping](#shape-grouping)
  - [Filter](#filter)
  - [Shortcuts](#shortcuts)

# User's guide

Computer Vision Annotation Tool (CVAT) is a web-based tool which helps to
annotate videos and images for Computer Vision algorithms. It was inspired
by [Vatic](http://carlvondrick.com/vatic/) free, online, interactive video
annotation tool. CVAT has many powerful features: _interpolation of bounding
boxes between key frames, automatic annotation using deep learning models,
shortcuts for most of critical actions, dashboard with a list of annotation
tasks, LDAP and basic authorization, etc..._ It was created for and used by
a professional data annotation team. UX and UI were optimized especially for
computer vision tasks developed by our team.

## Interface of the annotation tool

The tool consists of:
- ``Header`` -  pinned header used to navigate CVAT sections and account settings;
- ``Top panel`` — contains navigation buttons, main functions and menu access;
- ``Workspace`` — space where images are shown;
- ``Controls sidebar`` — contains tools for navigating the image, zoom,
  creating shapes and editing tracks (merge, split, group)
- ``Objects sidebar`` — contains label filter, two lists:
  objects (on the frame) and labels (of objects on the frame) and appearance settings.

![](static/documentation/images/image034_detrac.jpg)

### Basic navigation

1.  Use arrows below to move to the next/previous frame.
    Use the scroll bar slider to scroll through frames.
    Almost every button has a shortcut.
    To get a hint about a shortcut, just move your mouse pointer over an UI element.

    ![](static/documentation/images/image008.jpg)

1.  To navigate the image, use the button on the controls sidebar.
    Another way an image can be moved/shifted is by holding the left mouse button inside
    an area without annotated objects.
    If the ``Mouse Wheel`` is pressed, then all annotated objects are ignored. Otherwise the
    a highlighted bounding box will be moved instead of the image itself.

    ![](static/documentation/images/image136.jpg)

1.  You can use the button on the sidebar controls to zoom on a region of interest.
    Use the button ``Fit the image`` to fit the image in the workspace.
    You can also use the mouse wheel to scale the image
    (the image will be zoomed relatively to your current cursor position).

    ![](static/documentation/images/image137.jpg)

### Types of shapes (basics)

There are five shapes which you can annotate your images with:
- ``Rectangle`` or ``Bounding box``
- ``Polygon``
- ``Polyline``
- ``Points``
- ``Cuboid``
- ``Tag``

And there is how they all look like:

![](static/documentation/images/image038_detrac.jpg "Rectangle") ![](static/documentation/images/image033_detrac.jpg "Polygon")

![](static/documentation/images/image009_mapillary_vistas.jpg "Polyline") ![](static/documentation/images/image010_affectnet.jpg "Points")

![](static/documentation/images/image015_detrac.jpg "Cuboid") ![](static/documentation/images/image135.jpg "Tag")

``Tag`` - has no shape in the workspace, but is displayed in objects sidebar.

### Shape mode (basics)
Usage examples:
- Create new annotations for a set of images.
- Add/modify/delete objects for existing annotations.

1.  You need to select ``Rectangle`` on the controls sidebar:

    ![](static/documentation/images/image082.jpg)

    Before you start, select the correct `` Label`` (should be specified by you when creating the task)
    and `` Drawing Method`` (by 2 points or by 4 points):

    ![](static/documentation/images/image080.jpg)

1.  Creating a new annotation in ``Shape mode``:

    -   Create a separate ``Rectangle`` by clicking on ``Shape``.

        ![](static/documentation/images/image081.jpg)

    -   Choose the opposite points. Your first rectangle is ready!

        ![](static/documentation/images/image011_detrac.jpg)

    -   To learn about creating a rectangle using the by 4 point drawing method, ([read here](#annotation-by-rectangle-4-points)).

    -   It is possible to adjust boundaries and location of the rectangle using a mouse.
        Rectangle's size is shown in the top right corner , you can check it by clicking on any point of the shape.
        You can also undo your actions using ``Ctrl+Z`` and redo them with ``Shift+Ctrl+Z`` or ``Ctrl+Y``.

1.  You can see the ``Object card`` in the objects sidebar or open it by right-clicking on the object.
    You can change the attributes in the details section.
    You can perform basic operations or delete an object by clicking on the action menu button.

    ![](static/documentation/images/image012.jpg)

1.  The following figure is an example of a fully annotated frame with separate shapes.

    ![](static/documentation/images/image013_detrac.jpg)

    Read more in the section [shape mode (advanced)](#shape-mode-advanced).

### Track mode (basics)
Usage examples:
- Create new annotations for a sequence of frames.
- Add/modify/delete objects for existing annotations.
- Edit tracks, merge several rectangles into one track.

1.  Like in the ``Shape mode``, you need to select a ``Rectangle`` on the sidebar,
    in the appearing form, select the desired ``Label`` and the ``Drawing method``.

    ![](static/documentation/images/image083.jpg)

1.  Creating a track for an object (look at the selected car as an example):
    - Create a ``Rectangle`` in ``Track mode`` by clicking on ``Track``.

      ![](static/documentation/images/image014.jpg)

    - In ``Track mode`` the rectangle will be automatically interpolated on the next frames.
    - The cyclist starts moving on frame #2270. Let's mark the frame as a key frame.
      You can press ``K`` for that or click the ``star`` button (see the screenshot below).

        ![](static/documentation/images/image016.jpg)

    - If the object starts to change its position, you need to modify the rectangle where it happens.
      It isn't necessary to change the rectangle on each frame, simply update several keyframes
      and the frames between them will be interpolated automatically.
    - Let's jump 30 frames forward and adjust the boundaries of the object. See an example below:

        ![](static/documentation/images/image017_detrac.jpg)

    -   After that the rectangle of the object will be changed automatically on frames 2270 to 2300:

        ![](static/documentation/images/gif019_detrac.gif)

1.  When the annotated object disappears or becomes too small, you need to
    finish the track. You have to choose ``Outside Property``, shortcut ``O``.

    ![](static/documentation/images/image019.jpg)

1.  If the object isn't visible on a couple of frames and then appears again,
    you can use the ``Merge`` feature to merge several individual tracks
    into one.

    ![](static/documentation/images/image020.jpg)

    -   Create tracks for moments when the cyclist is visible:

        ![](static/documentation/images/gif001_detrac.gif)

    -   Click ``Merge`` button or press key ``M`` and click on any rectangle of the first track
        and on any rectangle of the second track and so on:

        ![](static/documentation/images/image162_detrac.jpg)

    -   Click ``Merge`` button or press ``M`` to apply changes.

        ![](static/documentation/images/image020.jpg)

    -   The final annotated sequence of frames in ``Interpolation`` mode can
        look like the clip below:

        ![](static/documentation/images/gif003_detrac.gif)

        Read more in the section [track mode (advanced)](#track-mode-advanced).

### Attribute annotation mode (basics)

-   In this mode you can edit attributes with fast navigation between objects and frames using a keyboard.
    Open the drop-down list in the top panel and select Attribute annotation Mode.

    ![](static/documentation/images/image023_affectnet.jpg)

-   In this mode objects panel change to a special panel :

    ![](static/documentation/images/image026.jpg)

-   The active attribute will be red. In this case it is ``gender`` . Look at the bottom side panel to see all possible
    shortcuts for changing the attribute. Press key ``2`` on your keyboard to assign a value (female) for the attribute
    or select from the drop-down list.

    ![](static/documentation/images/image024_affectnet.jpg)

-   Press ``Up Arrow``/``Down Arrow`` on your keyboard or click the buttons in the UI to go to the next/previous
    attribute. In this case, after pressing ``Down Arrow`` you will be able to edit the ``Age`` attribute.

    ![](static/documentation/images/image025_affectnet.jpg)

-   Use ``Right Arrow``/``Left Arrow`` keys to move to the previous/next image with annotation.

To see all the hot keys available in the attribute annotation mode, press ``F2``.
Read more in the section [attribute annotation mode (advanced)](#attribute-annotation-mode-advanced).

### Downloading annotations

1.  To download the latest annotations, you have to save all changes first.
    click the ``Save`` button. There is a ``Ctrl+S`` shortcut to save annotations quickly.
1.  After that, сlick the ``Menu`` button.
1.  Press the ``Dump Annotation`` button.

    ![](static/documentation/images/image028.jpg)

1.  Choose format dump annotation file. Dump annotation are available in several formats:
    - [CVAT for video](/cvat/apps/documentation/xml_format.md#interpolation)
      is highlighted if a task has the interpolation mode.
    - [CVAT for images](/cvat/apps/documentation/xml_format.md#annotation)
      is highlighted if a task has the annotation mode.

    ![](static/documentation/images/image029.jpg "Example XML format")

    - [PASCAL VOC](http://host.robots.ox.ac.uk/pascal/VOC/)
    - [(VOC) Segmentation mask](http://host.robots.ox.ac.uk/pascal/VOC/) —
      archive contains class and instance masks for each frame in the png
      format and a text file with the value of each color.
    - [YOLO](https://pjreddie.com/darknet/yolo/)
    - [COCO](http://cocodataset.org/#format-data)
    - [TFRecord](https://www.tensorflow.org/tutorials/load_data/tf_records)
    - [MOT](https://motchallenge.net/)
    - [LabelMe 3.0](http://labelme.csail.mit.edu/Release3.0/)
    - [Datumaro](https://github.com/opencv/cvat/blob/develop/datumaro/)

### Task synchronization with a repository

1.  At the end of the annotation process, a task is synchronized by clicking
    `` Synchronize`` on the task page. Notice: this feature
    works only if a git repository was specified when the task was created.

    ![](static/documentation/images/image106.jpg)

1.  After synchronization the button ``Sync`` is highlighted in green. The
    annotation is now in the repository in a temporary branch.

    ![](static/documentation/images/image109.jpg)

1.  The next step is to go to the repository and manually create a pull request to the main branch.
1.  After confirming the PR, when the annotation is saved in the main branch, the color of the task changes to blue.

    ![](static/documentation/images/image110.jpg)

### Vocabulary

**Label** is a type of an annotated object (e.g. person, car, vehicle, etc.)

![](static/documentation/images/image032_detrac.jpg)

---

**Attribute** is a property of an annotated object (e.g. color, model,
quality, etc.). There are two types of attributes:

-   **Unique**: immutable and can't be changed from frame to frame (e.g. age, gender, color, etc.)

    ![](static/documentation/images/image073.jpg)

-   **Temporary**: mutable and can be changed on any frame (e.g. quality, pose, truncated, etc.)

    ![](static/documentation/images/image072.jpg)

---
**Track** is a set of shapes on different frames which corresponds to one object.
Tracks are created in ``Track mode``

![](static/documentation/images/gif003_detrac.gif)

---
**Annotation** is a set of shapes and tracks. There are several types of annotations:
- _Manual_ which is created by a person
- _Semi-automatic_ which is created mainly automatically, but the user provides some data (e.g. interpolation)
- _Automatic_ which is created automatically without a person in the loop

---
### Workspace

This is the main field in which drawing and editing objects takes place.
In addition the workspace also has the following functions:
-   Right-clicking on an object calls up the ``Object card`` - this is an element containing
    the necessary controls for changing the label and attributes of the object, as well as the action menu.

    ![](static/documentation/images/image138_mapillary_vistas.jpg)

-   Right-clicking a point deletes it.

    ![](static/documentation/images/image139_mapillary_vistas.jpg)

-   ``Z-axis slider`` - Allows you to switch annotation layers hiding the upper layers
    (slider is enabled if several z layers are on a frame).
    This element has a button for adding a new layer. When pressed, a new layer is added and switched to it.
    You can move objects in layers using the ``+`` and ``-`` keys.

    ![](static/documentation/images/image140.jpg)

---
### Settings

To open the settings open the user menu in the header and select the settings item or press ``F3``.

![](static/documentation/images/image067.jpg)

``Settings`` have two tabs:

In tab ``Player`` you can:
-   Control step of ``C`` and ``V`` shortcuts.
-   Control speed of ``Space``/``Play`` button.
-   Show ``Grid``, change grid size, choose color and transparency:

    ![](static/documentation/images/image068_mapillary_vistas.jpg)

-   Show every image in full size or zoomed out like previous
    (it is enabled by default for interpolation mode and disabled for annotation mode).
- ``Rotate all images``  checkbox — switch the rotation of all frames or an individual frame.
-   Adjust ``Brightness``/``Contrast``/``Saturation`` of too exposed or too
    dark images using ``F3`` — color settings (changes displaying settings and not the
    image itself).

Shortcuts:
-   ``Shift+B+=``/``Shift+B+-`` for brightness.
-   ``Shift+C+=``/``Shift+C+-`` for contrast.
-   ``Shift+S+=``/``Shift+S+-`` for saturation.

    ![](static/documentation/images/image164_mapillary_vistas.jpg)

-   ``Reset color settings`` to default values.

---

In tab ``Workspace`` you can:

![](static/documentation/images/image155.jpg)

- ``Enable auto save`` checkbox — turned off by default.
- ``Auto save interval (min)`` input box — 15 minutes by default.
- ``Show all interpolation tracks`` checkbox — shows hidden objects on the
  side panel for every interpolated object (turned off by default).
- ``Always show object details`` - show text for an object on the canvas not only when the object is activated:

   ![](static/documentation/images/image152_detrac.jpg)

- ``Automatic bordering`` - enable automatic bordering for polygons and polylines during drawing/editing.
  For more information To find out more, go to the section [annotation with polygons](#Annotation-with-polygons).
- ``Attribute annotation mode (AAM) zoom margin`` input box — defines margins (in px)
  for shape in the attribute annotation mode.
- Press `` Go back`` or ``F3`` to return to the annotation.

---

### Top Panel

![](static/documentation/images/image035.jpg)

---

#### Menu button

It is the main menu of the annotation tool. It can be used to download, upload and remove annotations.

![](static/documentation/images/image051.jpg)

Button assignment:

- ``Dump Annotations`` — downloads annotations from a task.
- ``Upload Annotations`` — uploads annotations into a task.
- ``Remove Annotations`` — removes annotations from the current job.
- ``Export as a dataset`` — download a data set from a task. Several formats are available:
  - [Datumaro](https://github.com/opencv/cvat/blob/develop/datumaro/docs/design.md)
  - [Pascal VOC 2012](http://host.robots.ox.ac.uk/pascal/VOC/)
  - [MS COCO](http://cocodataset.org/#format-data)
  - [YOLO](https://pjreddie.com/darknet/yolo/)
- ``Open the task`` — opens a page with details about the task.
- ``Run ReID merge`` —  automatic merge of shapes or tracks.
  It is used to combine individual objects - created by automatic annotation in a single track.
  For more information click [here](cvat/apps/reid/README.md).

#### Save Work
Saves annotations for the current job. The button has an indication of the saving process.

  ![](static/documentation/images/image141.jpg)

#### Undo-redo buttons

  Use buttons to undo actions or redo them.

  ![](static/documentation/images/image061.jpg)

---

#### Player

  Go to the first /the latest frames.

  ![](static/documentation/images/image036.jpg)

Go to the next/previous frame with a predefined step. Shortcuts:
``V`` — step backward, ``C`` — step forward. By default the step is ``10`` frames
(change at ``Account Menu`` —> ``Settings`` —> ``Player Step``).

  ![](static/documentation/images/image037.jpg)

Go to the next/previous frame (the step is 1 frame). Shortcuts: ``D`` — previous, ``F`` — next.

  ![](static/documentation/images/image040.jpg)

Play the sequence of frames or the set of images.
Shortcut: ``Space`` (change at ``Account Menu`` —> ``Settings`` —> ``Player Speed``).

  ![](static/documentation/images/image041.jpg)

Go to a specific frame. Press ``~`` to focus on the element.

  ![](static/documentation/images/image060.jpg)

---

#### Fullscreen Player
The fullscreen player mode. The keyboard shortcut is ``F11``.

  ![](static/documentation/images/image143.jpg)

#### Info
Open the job info.

  ![](static/documentation/images/image144_detrac.jpg)

- Job status: ``annotation``, ``validation`` or ``completed`` task

_Overview_:

-  ``Assinger`` - the one to whom the job is assigned.
-  ``Start Frame`` - the number of the first frame in this job.
-  ``End Frame`` - the number of the last frame in this job.
-  ``Frames`` - the total number of all frames in the job.
-  ``Z-Order`` - z-order enable indicator.

_Annotations statistics_:

  This is a table number of created shapes, sorted by labels (e.g. vehicle, person)
  and type of annotation (shape, track). As well as the number of manual and interpolated frames.

#### UI switcher
Switching between user interface modes.

  ![](static/documentation/images/image145.jpg)

---

### Controls sidebar

**Navigation block** - contains tools for moving and rotating images.
|Icon                                         |Description                                                           |
|--                                           |--                                                                    |
|![](static/documentation/images/image148.jpg)|``Cursor`` (``Esc``)- a basic annotation pedacting tool.              |
|![](static/documentation/images/image149.jpg)|``Move the image``- a tool for moving around the image without<br/> the possibility of editing.|
|![](static/documentation/images/image102.jpg)|``Rotate``- two buttons to rotate the current frame<br/> a clockwise (``Ctrl+R``) and anticlockwise (``Ctrl+Shift+R``).<br/> You can enable ``Rotate all images`` in the settings to rotate all the images in the job

**Zoom block** - contains tools for image zoom.
|Icon                                         |Description                                                           |
|--                                           |--                                                                    |
|![](static/documentation/images/image151.jpg)|``Fit image``- fits image into the workspace size.<br/> Shortcut - double click on an image|
|![](static/documentation/images/image166.jpg)|``Select a region of interest``- zooms in on a selected region.<br/> You can use this tool to quickly zoom in on a specific part of the frame.|

**Shapes block** - contains all the tools for creating shapes.
|Icon                                         |Description   |Links to section  |
|--                                           |--            |--                |
|![](static/documentation/images/image167.jpg)|``Rectangle``|[Shape mode](#shape-mode-basics); [Track mode](#track-mode-basics);<br/> [Drawing by 4 points](#annotation-with-rectangle-by-4-points)|
|![](static/documentation/images/image168.jpg)|``Polygon``  |[Annotation with polygons](#annotation-with-polygons)  |
|![](static/documentation/images/image169.jpg)|``Polyline`` |[Annotation with polylines](#annotation-with-polylines)|
|![](static/documentation/images/image170.jpg)|``Points``   |[Annotation with points](#annotation-with-points)      |
|![](static/documentation/images/image176.jpg)|``Cuboid``   |[Annotation with cuboids](#annotation-with-cuboids)    |
|![](static/documentation/images/image171.jpg)|``Tag``      |[Annotation with tags](#annotation-with-tag)s            |

**Edit block** - contains tools for editing tracks and shapes.
|Icon                                         |Description                                        |Links to section  |
|--                                           |--                                                 |--                |
|![](static/documentation/images/image172.jpg)|``Merge Shapes``(``M``) — starts/stops the merging shapes mode.  |[Track mode (basics)](#track-mode-basics)|
|![](static/documentation/images/image173.jpg)|``Group Shapes`` (``G``) — starts/stops the grouping shapes mode.|[Shape grouping](#shape-grouping)|
|![](static/documentation/images/image174.jpg)|``Split`` — splits a track.                                      |[Track mode (advanced)](#track-mode-advanced)|

---

### Objects sidebar

``Hide`` - the button hides the object's sidebar.

![](static/documentation/images/image146.jpg)

#### Objects

**Filter** input box

![](static/documentation/images/image059.jpg)

The way how to use filters is described in the advanced guide [here](#filter).

**List of objects**

![](static/documentation/images/image147.jpg)

  - Switch lock property for all - switches  lock property of all objects in the frame.
  - Switch hidden property for all - switches hide property of all objects in the frame.
  - Expand/collapse all - collapses/expands the details field of all objects in the frame.
  - Sorting - sort the list of objects: updated time, ID - accent, ID -  descent

In the objects sidebar you can see the list of available objects on the current
frame. The following figure is an example of how the list might look like:

| Shape mode                                    | Track mode                                    |
|--                                             |--                                             |
| ![](static/documentation/images/image044.jpg) | ![](static/documentation/images/image045.jpg) |

---
**Objects** on the side bar

The type of a shape can be changed by selecting **Label** property. For instance, it can look like shown on the figure below:

![](static/documentation/images/image050.jpg)

**Object action menu**

The action menu calls up the button:

  ![](static/documentation/images/image047.jpg)

The action menu contains:

- ``Create object URL`` - puts a link to an object on the clipboard. After you open the link, this object will be filtered.
- ``Make a copy``- copies an object. The keyboard shortcut is ``Ctrl + C`` ``Ctrl + V``.
- ``Propagate`` - Сopies the form to several frames,
  invokes a dialog box in which you can specify the number of copies
  or the frame onto which you want to copy the object. The keyboard shortcut ``Ctrl + B``.

  ![](static/documentation/images/image053.jpg)

- ``To background`` - moves the object to the background. The keyboard shortcut ``-``,``_``.
- ``To foreground`` - moves the object to the foreground. The keyboard shortcut ``+``,``=``.
- ``Remove`` - removes the object. The keyboard shortcut ``Del``,``Shift+Del``.

A shape can be locked to prevent its modification or moving by an accident. Shortcut to lock an object: ``L``.

![](static/documentation/images/image046.jpg)

A shape can be **Occluded**. Shortcut: ``Q``. Such shapes have dashed boundaries.

![](static/documentation/images/image048.jpg)

![](static/documentation/images/image049_detrac.jpg)

You can change the way an object is displayed on a frame (show or hide).

![](static/documentation/images/image055.jpg)

``Switch pinned property`` - when enabled, a shape cannot be moved by dragging or dropping.

![](static/documentation/images/image052.jpg)

You can change an object's color.
To do so, click on the color bar of the object and select a color from the palette that appears.

![](static/documentation/images/image153.jpg)

By clicking on the ``Details`` button you can collapse or expand the field with all the attributes of the object.

![](static/documentation/images/image154.jpg)

---

#### Labels
You can also change the color of any object to random, to do so just hover
the mouse over the object on the frame and highlight them by clicking on a label you need.
In this tab, you can lock or hide objects of a certain label.

![](static/documentation/images/image062.jpg)

---

#### Appearance

**Color By** options

Change the color scheme of annotation:
-   ``Instance`` — every  shape has random color

    ![](static/documentation/images/image095_detrac.jpg)

-   ``Group`` — every group of shape has its own random color, ungrouped shapes are white

    ![](static/documentation/images/image094_detrac.jpg)

-   ``Label`` — every label (e.g. car, person) has its own random color

    ![](static/documentation/images/image093_detrac.jpg)

    You can change any random color pointing to a needed box on a frame or on an
    object sidebar.

**Fill Opacity** slider

Change the opacity of every shape in the annotation.

![](static/documentation/images/image086_detrac.jpg)

**Selected Fill Opacity** slider

Change the opacity of the selected object's fill.

![](static/documentation/images/image089_detrac.jpg)

**Black Stroke** checkbox

Changes the shape border from colored to black.

![](static/documentation/images/image088_detrac.jpg)

**Show bitmap** checkbox

If enabled all shapes are displayed in white and the background is black.

![](static/documentation/images/image087_detrac.jpg)

**Show projections** checkbox

Enables / disables the display of auxiliary perspective lines. Only relevant for cuboids

![](static/documentation/images/image090_detrac.jpg)

## Shape mode (advanced)

Basic operations in the mode were described in section [shape mode (basics)](#shape-mode-basics).

**Occluded**
Occlusion is an attribute used if an object is occluded by another object or
isn't fully visible on the frame. Use ``Q`` shortcut to set the property
quickly.

![](static/documentation/images/image065.jpg)

Example: the three cars on the figure below should be labeled as **occluded**.

![](static/documentation/images/image054_mapillary_vistas.jpg)

If a frame contains too many objects and it is difficult to annotate them
due to many shapes placed mostly in the same place, it makes sense
to lock them. Shapes for locked objects are transparent, and it is easy to
annotate new objects. Besides, you can't change previously annotated objects
by accident. Shortcut: ``L``.

![](static/documentation/images/image066.jpg)

## Track mode (advanced)

Basic operations in the mode were described in section [track mode (basics)](#track-mode-basics).

Shapes that were created in the track mode, have extra navigation buttons.
-   These buttons help to jump to the previous/next keyframe.

    ![](static/documentation/images/image056.jpg)

-   The button helps to jump to the initial frame and to the last keyframe.

    ![](static/documentation/images/image057.jpg)

You can use the `` Split '' function to split one track into two tracks:

![](static/documentation/images/gif010_detrac.gif)

## Attribute annotation mode (advanced)

Basic operations in the mode were described in section [attribute annotation mode (basics)](#attribute-annotation-mode-basics).

It is possible to handle lots of objects on the same frame in the mode.

![](static/documentation/images/image058_detrac.jpg)

It is more convenient to annotate objects of the same type. In this case you can apply
the appropriate filter. For example, the following filter will
hide all objects except person: ``label=="Person"``.

To navigate between objects (person in this case),
use the following buttons ``switch between objects in the frame`` on the special panel:

![](static/documentation/images/image026.jpg)

or shortcuts:
- ``Tab`` — go to the next object
- ``Shift+Tab`` — go to the previous object.

In order to change the zoom level, go to settings (press ``F3``)
in the workspace tab and set the value Attribute annotation mode (AAM) zoom margin in px.

## Annotation with rectangle by 4 points
It is an efficient method of bounding box annotation, proposed
[here](https://arxiv.org/pdf/1708.02750.pdf).
Before starting, you need to make sure that the drawing method by 4 points is selected.

![](static/documentation/images/image134.jpg)

Press ``Shape`` or ``Track`` for entering drawing mode. Click on four extreme points:
the top, bottom, left- and right-most physical points on the object.
Drawing will be automatically completed right after clicking the fourth point.
Press ``Esc`` to cancel editing.

![](static/documentation/images/gif016_mapillary_vistas.gif)

## Annotation with polygons

### Manual drawing

It is used for semantic / instance segmentation.

If you want to annotate polygons, make sure the ``Z-Order`` flag in ``Create new task`` dialog is enabled.
The Z-Order flag defines the order of drawing. It is necessary to
get the right annotation mask without extra work (additional drawing of borders).
Z-Order can be changed by pressing ``+``/``-`` which set maximum/minimum z-order
accordingly.

![](static/documentation/images/image074.jpg)

Before starting, you need to select ``Polygon`` on the controls sidebar and choose the correct Label.

![](static/documentation/images/image084.jpg)

- Click ``Shape`` to enter drawing mode.
  There are two ways to draw a polygon: either create points by clicking or
  by dragging the mouse on the screen while holding ``Shift``.

| Clicking points                                   | Holding Shift+Dragging                            |
| --                                                | --                                                |
| ![](static/documentation/images/gif005_detrac.gif)| ![](static/documentation/images/gif006_detrac.gif)|

- When ``Shift`` isn't pressed, you can zoom in/out (when scrolling the mouse
  wheel) and move (when clicking the mouse wheel and moving the mouse), you can also
  delete the previous point by right-clicking on it.
- Press ``N`` again for completing the shape.
- After creating the polygon, you can move the points or delete them by right-clicking and selecting ``Delete point``
  or double-clicking with pressed ``Ctrl`` key in the context menu.

### Drawing using automatic borders

![](static/documentation/images/gif025_mapillary_vistas.gif)

You can use auto borders when drawing a polygon. Using automatic borders allows you to automatically trace
the outline of polygons existing in the annotation.
- To do this, go to settings -> workspace tab and enable ``Automatic Bordering``
  or press ``Ctrl`` while drawing a polygon.

  ![](static/documentation/images/image161.jpg)

- Start drawing / editing a polygon.
- Points of other shapes will be highlighted, which means that the polygon can be attached to them.
- Define the part of the polygon path that you want to repeat.

  ![](static/documentation/images/image157_mapillary_vistas.jpg)

- Click on the first point of the contour part.

  ![](static/documentation/images/image158_mapillary_vistas.jpg)

- Then click on any point located on part of the path. The selected point will be highlighted in purple.

  ![](static/documentation/images/image159_mapillary_vistas.jpg)

- Сlick on the last point and the outline to this point will be built automatically.

  ![](static/documentation/images/image160_mapillary_vistas.jpg)

Besides, you can set a fixed number of points in the ``Number of points`` field, then
drawing will be stopped automatically. To enable dragging you should right-click
inside the polygon and choose ``Switch pinned property``.

Below you can see results with opacity and black stroke:

![](static/documentation/images/image064_mapillary_vistas.jpg)

If you need to annotate small objects, increase ``Image Quality`` to
``95`` in ``Create task`` dialog for your convenience.

### Make AI polygon

Used to create a polygon semi-automatically.
- Before starting, you have to make sure that the ``Make AI polygon`` is selected.

  ![](static/documentation/images/image114.jpg)

- Click ``Shape`` to enter drawing mode. Now you can start annotating the necessary area.
  A shape must consist of 4 points minimum. You can set a fixed number of points in the ``Number of points`` field,
  then drawing will be stopped automatically. You can zoom in/out and move while drawing.
- Press ``N`` again to finish marking the area. At the end of Auto Segmentation,
  a shape is created and you can work with it as a polygon.

  ![](static/documentation/images/gif009_detrac.gif)

### Edit polygon

To edit a polygon you have to double-click with pressed ``Shift``, it will open the polygon editor.
- There you can create new points or delete part of a polygon closing the line on another point.
- After closing the polygon, you can select the part of the polygon that you want to leave.
- You can press ``Esc`` to cancel editing.

  ![](static/documentation/images/gif007_mapillary_vistas.gif)

## Annotation with polylines

It is used for road markup annotation etc.

Before starting, you need to select the ``Polyline``. You can set a fixed number of points
in the ``Number of points`` field, then drawing will be stopped automatically.

![](static/documentation/images/image085.jpg)

Click ``Shape`` to enter drawing mode. There are two ways to draw a polyline —
you either create points by clicking or by dragging a mouse on the screen while holding ``Shift``.
When ``Shift`` isn't pressed, you can zoom in/out (when scrolling the mouse wheel)
and move (when clicking the mouse wheel and moving the mouse), you can delete
previous points by right-clicking on it. Press ``N`` again to complete the shape.
You can delete a point by double-clicking on it with pressed ``Ctrl`` or right-clicking on a point
and selecting ``Delete point``. Double-click with pressed ``Shift`` will open a polyline editor.
There you can create new points(by clicking or dragging) or delete part of a polygon closing
the red line on another point. Press ``Esc`` to cancel editing.

![](static/documentation/images/image039_mapillary_vistas.jpg)

## Annotation with points

### Points in shape mode

It is used for face, landmarks annotation etc.

Before you start you need to select the ``Points``. If necessary you can set a fixed number of points
in the ``Number of points`` field, then drawing will be stopped automatically.

![](static/documentation/images/image042.jpg)

Click ``Shape`` to entering the drawing mode. Now you can start annotation of the necessary area.
Points are automatically grouped — all points will be considered linked between each start and finish.
Press ``N`` again to finish marking the area. You can delete a point by double-clicking with pressed ``Ctrl``
or right-clicking on a point and selecting ``Delete point``. Double-clicking with pressed ``Shift`` will open the points
shape editor. There you can add new points into an existing shape. You can zoom in/out (when scrolling the mouse wheel)
and move (when clicking the mouse wheel and moving the mouse) while drawing. You can drag an object after
it has been drawn and change the position of individual points after finishing an object.

![](static/documentation/images/image063_affectnet.jpg)

### Linear interpolation with one point

You can use linear interpolation for points to annotate a moving object:

1.  Before you start, select the ``Points``.
1.  Linear interpolation works only with one point, so you need to set ``Number of points`` to 1.
1.  After that select the ``Track``.

    ![](static/documentation/images/image122.jpg)

1.  Click ``Track`` to enter the drawing mode left-click to create a point and after that shape will be automatically completed.

    ![](static/documentation/images/image163_detrac.jpg)

1.  Move forward a few frames and move the point to the desired position,
    this way you will create a keyframe and intermediate frames will be drawn automatically.
    You can work with this object as with an interpolated track: you can hide it using the ``Outside``,
    move around keyframes, etc.

    ![](static/documentation/images/image165_detrac.jpg)

1.  This way you'll get linear interpolation using the `` Points``.

    ![](static/documentation/images/gif013_detrac.gif)

## Annotation with cuboids

It is used to annotate 3 dimensional objects such as cars, boxes, etc...
Currently the feature supports one point perspective and has the constraint
where the vertical edges are exactly parallel to the sides.

### Creating the cuboid

Before you start, you have to make sure that Cuboid is selected
 and choose a drawing method ”from rectangle” or “by 4 points”.

![](static/documentation/images/image091.jpg)

#### Drawing cuboid by 4 points

Choose a drawing method “by 4 points” and click Shape to enter the drawing mode. There are many ways to draw a cuboid.
You can draw the cuboid by placing 4 points, after that the drawing will be completed automatically.
The first 3 points determine the plane of the cuboid while the last point determines the depth of that plane.
For the first 3 points, it is recommended to only draw the 2 closest side faces, as well as the top and bottom face.

A few examples:

![](static/documentation/images/image177_mapillary_vistas.jpg)

### Drawing cuboid from rectangle

Choose a drawing method “from rectangle” and click Shape to enter the drawing mode.
When you draw using the rectangle method, you must select the frontal plane of the object using the bounding box.
The depth and perspective of the resulting cuboid can be edited.

Example:

![](static/documentation/images/image182_mapillary_vistas.jpg)

### Editing the cuboid

![](static/documentation/images/image178_mapillary_vistas.jpg)

The cuboid can be edited in multiple ways: by dragging points, by dragging certain faces or by dragging planes.
First notice that there is a face that is painted with gray lines only, let us call it the front face.

You can move the cuboid by simply dragging the shape behind the front face.
The cuboid can be extended by dragging on the point in the middle of the edges.
The cuboid can also be extended up and down by dragging the point at the vertices.

![](static/documentation/images/gif017_mapillary_vistas.gif)

To draw with perspective effects it should be assumed that the front face is the closest to the camera.
To begin simply drag the points on the vertices that are not on the gray/front face while holding ``Shift``.
The cuboid can then be edited as usual.

![](static/documentation/images/gif018_mapillary_vistas.gif)

If you wish to reset perspective effects, you may right click on the cuboid,
and select ``Reset perspective`` to return to a regular cuboid.

![](static/documentation/images/image180_mapillary_vistas.jpg)

The location of the gray face can be swapped with the adjacent visible side face.
You can do it by right clicking on the cuboid and selecting ``Switch perspective orientation``.
Note that this will also reset the perspective effects.

![](static/documentation/images/image179_mapillary_vistas.jpg)

Certain faces of the cuboid can also be edited,
these faces are: the left, right and dorsal faces, relative to the gray face.
Simply drag the faces to move them independently from the rest of the cuboid.

![](static/documentation/images/gif020_mapillary_vistas.gif)

You can also use cuboids in track mode, similar to rectangles in track mode ([basics](#track-mode-basics) and [advanced](#track-mode-advanced))

## Annotation with Tags

Used to annotate frames, does not have a shape in the workspace.
Before you start, you have to make sure that Tag is selected.

![](static/documentation/images/image181.jpg)

Click tag to create. You can work with Tag only on the sidebar.
You can use the lock function and change label and attribute.
Other functions such as propagate, make a copy and remove are available in the action menu.

![](static/documentation/images/image135.jpg)

## Automatic annotation

Automatic Annotation is used for creating preliminary annotations.
To use Automatic Annotation you need a DL model. You can use primary models or models uploaded by a user.
You can find the list of available models in the ``Models`` section.

1.  To launch automatic annotation, you should open the dashboard and find a task which you want to annotate.
    Then click the ``Actions`` button and choose option ``Automatic Annotation`` from the dropdown menu.

    ![](static/documentation/images/image119_detrac.jpg)

1.  In the dialog window select a model you need. DL models are created for specific labels, e.g.
    the Crossroad model was taught using footage from cameras located above the highway and it is best to
    use this model for the tasks with similar camera angles.
    If it's necessary select the ``Clean old annotations`` checkbox.
    Adjust the labels so that the task labels will correspond to the labels of the DL model.
    For example, let’s consider a task where you have to annotate labels “car” and “person”.
    You should connect the “person” label from the model to the “person” label in the task.
    As for the “car” label, you should choose the most fitting label available in the model - the “vehicle” label.
    The task requires to annotate cars only and choosing the “vehicle” label implies annotation of all vehicles,
    in this case using auto annotation will help you complete the task faster.
    Click ``Submit`` to begin the automatic annotation process.

    ![](static/documentation/images/image120.jpg)

1.  At runtime - you can see the percentage of completion.
    You can cancel the automatic annotation by clicking on the ``Cancel``button.

    ![](static/documentation/images/image121_detrac.jpg)

1.  The end result of an automatic annotation is an annotation with separate rectangles (or other shapes)

    ![](static/documentation/images/gif014_detrac.gif)

1.  Separated bounding boxes can be edited by removing false positives, adding unlabeled objects and
    merging into tracks using ``ReID merge`` function. Click the ``ReID merge`` button in the menu.
    You can use the default settings (for more information click [here](cvat/apps/reid/README.md)).
    To launch the merging process click ``Merge``. Each frame of the track will be a key frame.

    ![](static/documentation/images/image133.jpg)

1.  You can remove false positives and edit tracks using ``Split`` and ``Merge`` functions.

    ![](static/documentation/images/gif015_detrac.gif)

## Shape grouping

This feature allows us to group several shapes.

You may use the ``Group Shapes`` button or shortcuts:
- ``G`` — start selection / end selection in group mode
- ``Esc`` — close group mode
- ``Shift+G`` — reset group for selected shapes

You may select shapes clicking on them or selecting an area.

Grouped shapes will have ``group_id`` filed in dumped annotation.

Also you may switch color distribution from an instance (default) to a group.
You have to switch ``Color By Group`` checkbox for that.

Shapes that don't have ``group_id``, will be highlighted in white.

![](static/documentation/images/image078_detrac.jpg)

![](static/documentation/images/image077_detrac.jpg)

## Filter

![](static/documentation/images/image059.jpg)

There are some reasons to use the feature:

1. When you use a filter, objects that don't match the filter will be hidden.
1. Fast navigation between the frames that have an object of interest. Use
``Left Arrow`` / ``Right Arrow`` keys for this purpose. If there are no objects matching the filter,
the will go to arrows the previous/next frames which contains any objects.
1. The list contains frequently used and recent filters.

To use the function, it is enough to specify a value inside the ``Filter`` text
field and press ``Enter``. After that, the filter will be applied.

---
**Supported properties:**

| Properties  | Supported values                  | Description                                                       |
|--           |--                                 | --                                                                |
| ``width``   |number of px or ``height``         | shape width                                                       |
| ``height``  |number of px or ``width``          | shape height                                                      |
| ``label``   |``"text"``  or ``["text"]``        | label name                                                        |
| ``serverID``| number                            | ID of the object on server <br> (You can find out by forming a link to the object through the Action menu)|
| ``clientID``| number                            | ID of the object in your client (indicated on the objects sidebar)|
| ``type``    |``"shape"``, ``"track"``, ``"tag"``| type of object                                                    |
| ``shape``   |``"rectangle"``,``"polygon"``, <br>``"polyline"``,``"points"``| type of shape                          |
| ``occluded``|``true`` or ``false``              | occluded properties                                               |
| ``attr``    |``"text"``                         | attribute name                                                    |

**Supported operators:**

``==`` - Equally; ``!=`` - Not equal; ``>``  - More; ``>=`` - More or equal; ``<``  - Less; ``<=`` - Less or equal;
``()`` - Brackets; ``&``  - And; ``|``- Or.

If you have double quotes in your query string, please escape them using backslash: ``\"`` (see the latest example)
All properties and values are case-sensitive. CVAT uses json queries to perform search.

---

**Examples filters**

- ``label=="car" | label==["road sign"]`` - this filter will show only objects with the car or road sign label.
- ``shape == "polygon"`` - this filter will show only polygons.
- ``width >= height`` - this filter will show only those objects whose width will be greater than
  or equal to the height.
- ``attr["color"] == "black"`` - this filter will show objects whose color attribute is black.
- ``clientID == 50`` - this filter will show the object with id equal to 50 (e.g. rectangle 50).
- ``(label=="car" & attr["parked"]==true) | (label=="pedestrian" & width > 150)`` - this filter will display objects
  with the “car” label and the parking attribute enabled or objects with the “pedestrian” label with a height of more
  than 150 pixels
- ``(( label==["car \"mazda\""]) | (attr["parked"]==true & width > 150)) & (height > 150 & (clientID == serverID)))`` -
  This filter will show objects with the label "car" mazda "" or objects that have the parked attribute turned on
  and have a width of more than 150 pixels, and those listed should have a height of more than 150 pixels
  and their clientID is equal to serverID.

**Filter history**

![](static/documentation/images/image175.jpg)

You can add previously entered filters and combine them. To do so, click on the input field and a list of previously
entered filters will open. Click on the filters to add them to the input field.
Combined filters occur with the "or" operator.

---

## Shortcuts

Many UI elements have shortcut hints. Put your pointer to a required element to see it.

![](static/documentation/images/image075.jpg)

| Shortcut                       | Common                                                                          |
|--------------------------------|---------------------------------------------------------------------------------|
|                                | _Main functions_                                                                |
| ``F2``                         | Open/hide the list of available shortcuts                                       |
| ``F3``                         | Go to the settings page or go back                                              |
| ``Ctrl+S``                     | Go to the settings page or go back                                              |
| ``Ctrl+Z``                     | Cancel the latest action related with objects                                   |
| ``Ctrl+Shift+Z`` or ``Ctrl+Y`` | Cancel undo action                                                              |
| Hold ``Mouse Wheel``           | To move an image frame (for example, while drawing)                             |
|                                | _Player_                                                                        |
| ``F``                          | Go to the next frame                                                            |
| ``D``                          | Go to the previous frame                                                        |
| ``V``                          | Go forward with a step                                                          |
| ``C``                          | Go backward with a step                                                         |
| ``Right``                      | Search the next frame that satisfies to the filters <br> or next frame which contain any objects|
| ``Left``                       | Search the previous frame that satisfies to the filters <br> or previous frame which contain any objects|
| ``Space``                      | Start/stop automatic changing frames                                            |
| `` ` `` or ``~``               | Focus on the element to change the current frame                                |
|                                | _Modes_                                                                         |
| ``N``                          | Repeat the latest procedure of drawing with the same parameters                 |
| ``M``                          | Activate or deactivate mode to merging shapes                                   |
| ``G``                          | Activate or deactivate mode to grouping shapes                                  |
| ``Shift+G``                    | Reset group for selected shapes (in group mode)                                 |
| ``Esc``                        | Cancel any active canvas mode                                                   |
|                                | _Image operations_                                                              |
| ``Ctrl+R``                     | Change image angle (add 90 degrees)                                             |
| ``Ctrl+Shift+R``               | Change image angle (substract 90 degrees)                                       |
| ``Shift+B+=``                  | Increase brightness level for the image                                         |
| ``Shift+B+-``                  | Decrease brightness level for the image                                         |
| ``Shift+C+=``                  | Increase contrast level for the image                                           |
| ``Shift+C+-``                  | Decrease contrast level for the image                                           |
| ``Shift+S+=``                  | Increase saturation level for the image                                         |
| ``Shift+S+-``                  | Increase contrast level for the image                                           |
| ``Shift+G+=``                  | Make the grid more visible                                                      |
| ``Shift+G+-``                  | Make the grid less visible                                                      |
| ``Shift+G+Enter``              | Set another color for the image grid                                            |
|                                | _Operations with objects_                                                       |
| ``Ctrl``                       | Switch automatic bordering for polygons and polylines during drawing/editing    |
| Hold ``Ctrl``                  | When the shape is active and fix it                                             |
| ``Ctrl+Double-Click`` on point | Deleting a point (used when hovering over a point of polygon, polyline, points) |
| ``Shift+Double-Click`` on point| Editing a shape (used when hovering over a point of polygon, polyline or points)|
| ``Right-Click`` on shape       | Display of an object element from objects sidebar                               |
| ``T+L``                        | Change locked state for all objects in the sidebar                              |
| ``L``                          | Change locked state for an active object                                        |
| ``T+H``                        | Change hidden state for objects in the sidebar                                  |
| ``H``                          | Change hidden state for an active object                                        |
| ``Q`` or ``/``                 | Change occluded property for an active object                                   |
| ``Del`` or ``Shift+Del``       | Delete an active object. Use shift to force delete of locked objects            |
| ``-`` or ``_``                 | Put an active object "farther" from the user (decrease z axis value)            |
| ``+`` or ``=``                 | Put an active object "closer" to the user (increase z axis value)               |
| ``Ctrl+C``                     | Copy shape to CVAT internal clipboard                                           |
| ``Ctrl+V``                     | Paste a shape from internal CVAT clipboard                                      |
| Hold ``Ctrl`` while pasting    | When pasting shape from the buffer for multiple pasting.                        |
| ``Crtl+B``                     | Make a copy of the object on the following frames                               |
|                                | _Operations are available only for track_                                       |
| ``K``                          | Change keyframe property for an active track                                    |
| ``O``                          | Change outside property for an active track                                     |
| ``R``                          | Go to the next keyframe of an active track                                      |
| ``E``                          | Go to the previous keyframe of an active track                                  |
|                                | _Attribute annotation mode_                                                     |
| ``Up Arrow``                   | Go to the next attribute (up)                                                   |
| ``Down Arrow``                 | Go to the next attribute (down)                                                 |
| ``Tab``                        | Go to the next annotated object in current frame                                |
| ``Shift+Tab``                  | Go to the previous annotated object in current frame                            |
| ``<number>``                   | Assign a corresponding value to the current attribute                           |