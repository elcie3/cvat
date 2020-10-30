# Generated by Django 3.1.1 on 2020-10-29 15:35

import cvat.apps.engine.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AttributeSpec',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('mutable', models.BooleanField()),
                ('input_type', models.CharField(choices=[('checkbox', 'CHECKBOX'), ('radio', 'RADIO'), ('number', 'NUMBER'), ('text', 'TEXT'), ('select', 'SELECT')], max_length=16)),
                ('default_value', models.CharField(max_length=128)),
                ('values', models.CharField(max_length=4096)),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='Data',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chunk_size', models.PositiveIntegerField(null=True)),
                ('size', models.PositiveIntegerField(default=0)),
                ('image_quality', models.PositiveSmallIntegerField(default=50)),
                ('start_frame', models.PositiveIntegerField(default=0)),
                ('stop_frame', models.PositiveIntegerField(default=0)),
                ('frame_filter', models.CharField(blank=True, default='', max_length=256)),
                ('compressed_chunk_type', models.CharField(choices=[('video', 'VIDEO'), ('imageset', 'IMAGESET'), ('list', 'LIST')], default=cvat.apps.engine.models.DataChoice['IMAGESET'], max_length=32)),
                ('original_chunk_type', models.CharField(choices=[('video', 'VIDEO'), ('imageset', 'IMAGESET'), ('list', 'LIST')], default=cvat.apps.engine.models.DataChoice['IMAGESET'], max_length=32)),
                ('storage_method', models.CharField(choices=[('cache', 'CACHE'), ('file_system', 'FILE_SYSTEM')], default=cvat.apps.engine.models.StorageMethodChoice['FILE_SYSTEM'], max_length=15)),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('annotation', 'ANNOTATION'), ('validation', 'VALIDATION'), ('completed', 'COMPLETED')], default=cvat.apps.engine.models.StatusChoice['ANNOTATION'], max_length=32)),
                ('assignee', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='Label',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', cvat.apps.engine.models.SafeCharField(max_length=64)),
                ('color', models.CharField(default='', max_length=8)),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='LabeledImage',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('frame', models.PositiveIntegerField()),
                ('group', models.PositiveIntegerField(null=True)),
                ('source', models.CharField(choices=[('auto', 'AUTO'), ('manual', 'MANUAL')], default='manual', max_length=16, null=True)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.job')),
                ('label', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.label')),
            ],
            options={
                'abstract': False,
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='LabeledShape',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('frame', models.PositiveIntegerField()),
                ('group', models.PositiveIntegerField(null=True)),
                ('source', models.CharField(choices=[('auto', 'AUTO'), ('manual', 'MANUAL')], default='manual', max_length=16, null=True)),
                ('type', models.CharField(choices=[('rectangle', 'RECTANGLE'), ('polygon', 'POLYGON'), ('polyline', 'POLYLINE'), ('points', 'POINTS'), ('cuboid', 'CUBOID')], max_length=16)),
                ('occluded', models.BooleanField(default=False)),
                ('z_order', models.IntegerField(default=0)),
                ('points', cvat.apps.engine.models.FloatArrayField()),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.job')),
                ('label', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.label')),
            ],
            options={
                'abstract': False,
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='LabeledTrack',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('frame', models.PositiveIntegerField()),
                ('group', models.PositiveIntegerField(null=True)),
                ('source', models.CharField(choices=[('auto', 'AUTO'), ('manual', 'MANUAL')], default='manual', max_length=16, null=True)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.job')),
                ('label', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.label')),
            ],
            options={
                'abstract': False,
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', cvat.apps.engine.models.SafeCharField(max_length=256)),
                ('bug_tracker', models.CharField(blank=True, default='', max_length=2000)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('annotation', 'ANNOTATION'), ('validation', 'VALIDATION'), ('completed', 'COMPLETED')], default=cvat.apps.engine.models.StatusChoice['ANNOTATION'], max_length=32)),
                ('assignee', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='TrackedShape',
            fields=[
                ('type', models.CharField(choices=[('rectangle', 'RECTANGLE'), ('polygon', 'POLYGON'), ('polyline', 'POLYLINE'), ('points', 'POINTS'), ('cuboid', 'CUBOID')], max_length=16)),
                ('occluded', models.BooleanField(default=False)),
                ('z_order', models.IntegerField(default=0)),
                ('points', cvat.apps.engine.models.FloatArrayField()),
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('frame', models.PositiveIntegerField()),
                ('outside', models.BooleanField(default=False)),
                ('track', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.labeledtrack')),
            ],
            options={
                'abstract': False,
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path', models.CharField(default='', max_length=1024)),
                ('width', models.PositiveIntegerField()),
                ('height', models.PositiveIntegerField()),
                ('data', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='video', to='engine.data')),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='TrackedShapeAttributeVal',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('value', cvat.apps.engine.models.SafeCharField(max_length=4096)),
                ('shape', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.trackedshape')),
                ('spec', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.attributespec')),
            ],
            options={
                'abstract': False,
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', cvat.apps.engine.models.SafeCharField(max_length=256)),
                ('mode', models.CharField(max_length=32)),
                ('bug_tracker', models.CharField(blank=True, default='', max_length=2000)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('overlap', models.PositiveIntegerField(null=True)),
                ('segment_size', models.PositiveIntegerField(default=0)),
                ('status', models.CharField(choices=[('annotation', 'ANNOTATION'), ('validation', 'VALIDATION'), ('completed', 'COMPLETED')], default=cvat.apps.engine.models.StatusChoice['ANNOTATION'], max_length=32)),
                ('assignee', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assignees', to=settings.AUTH_USER_MODEL)),
                ('data', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='engine.data')),
                ('owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='owners', to=settings.AUTH_USER_MODEL)),
                ('project', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tasks', related_query_name='task', to='engine.project')),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='ServerFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.CharField(max_length=1024)),
                ('data', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='server_files', to='engine.data')),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='Segment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_frame', models.IntegerField()),
                ('stop_frame', models.IntegerField()),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.task')),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='RemoteFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.CharField(max_length=1024)),
                ('data', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='remote_files', to='engine.data')),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='LabeledTrackAttributeVal',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('value', cvat.apps.engine.models.SafeCharField(max_length=4096)),
                ('spec', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.attributespec')),
                ('track', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.labeledtrack')),
            ],
            options={
                'abstract': False,
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='LabeledShapeAttributeVal',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('value', cvat.apps.engine.models.SafeCharField(max_length=4096)),
                ('shape', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.labeledshape')),
                ('spec', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.attributespec')),
            ],
            options={
                'abstract': False,
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='LabeledImageAttributeVal',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('value', cvat.apps.engine.models.SafeCharField(max_length=4096)),
                ('image', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.labeledimage')),
                ('spec', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.attributespec')),
            ],
            options={
                'abstract': False,
                'default_permissions': (),
            },
        ),
        migrations.AddField(
            model_name='label',
            name='task',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.task'),
        ),
        migrations.CreateModel(
            name='JobCommit',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('version', models.PositiveIntegerField(default=0)),
                ('timestamp', models.DateTimeField(auto_now=True)),
                ('message', models.CharField(default='', max_length=4096)),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='commits', to='engine.job')),
            ],
            options={
                'abstract': False,
                'default_permissions': (),
            },
        ),
        migrations.AddField(
            model_name='job',
            name='segment',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.segment'),
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path', models.CharField(default='', max_length=1024)),
                ('frame', models.PositiveIntegerField()),
                ('width', models.PositiveIntegerField()),
                ('height', models.PositiveIntegerField()),
                ('data', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='images', to='engine.data')),
            ],
            options={
                'default_permissions': (),
            },
        ),
        migrations.AddField(
            model_name='attributespec',
            name='label',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.label'),
        ),
        migrations.CreateModel(
            name='Attributes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', cvat.apps.engine.models.SafeCharField(max_length=4096)),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='engine.task')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='label',
            unique_together={('task', 'name')},
        ),
        migrations.CreateModel(
            name='ClientFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(max_length=1024, storage=cvat.apps.engine.models.MyFileSystemStorage(), upload_to=cvat.apps.engine.models.upload_path_handler)),
                ('data', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='client_files', to='engine.data')),
            ],
            options={
                'default_permissions': (),
                'unique_together': {('data', 'file')},
            },
        ),
        migrations.AlterUniqueTogether(
            name='attributespec',
            unique_together={('label', 'name')},
        ),
    ]
